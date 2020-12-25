﻿using AutoMapper;
using HRData.Models;
using HRData.Repositories;
using HRWebApplication.DTO;
using HRWebApplication.Helpers.ApiConventions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IEmployeeRepostiory _employeeRepostiory;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UsersController(
            IUserRepository userRepository,
            IEmployeeRepostiory employeeRepostiory,
            IUnitOfWork unitOfWork,
            IMapper mapper
            )
        {
            _userRepository = userRepository;
            _employeeRepostiory = employeeRepostiory;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        private string GetUserId()
        {
            return User.Claims.First(e => e.Type == "UserId").Value;
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpGet]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public IEnumerable<UserDTO> Get()
        {
            var users = _userRepository.GetAll();
            return from u in users
                   select new UserDTO
                   {
                       Id = u.Id,
                       UserName = u.UserName,
                       Password = null,
                       Email = u.Email
                   };
        }

        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Manager")]
        public ActionResult<UserDTO> Get(string id)
        {
            var user = _userRepository.GetById(id);
            if (user is null)
                return NotFound();
            return new UserDTO() { Id = user.Id, UserName = user.UserName, Password = null, Email = user.Email };
        }

        [ApiConventionMethod(typeof(CustomApiConventions), nameof(CustomApiConventions.Perform))]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserDTO user)
        {
            var newUser = new User()
            {
                UserName = user.UserName,
                Email = user.Email
            };
            var res = await _userRepository.Create(newUser, user.Password);
            if (!res.Succeeded)
            {
                return BadRequest();
            }

            return NoContent();
        }

        [ApiConventionMethod(typeof(CustomApiConventions), nameof(CustomApiConventions.Interact))]
        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDTO userDTO)
        {
            var token = await _userRepository.GenerateLoginToken(userDTO.UserName, userDTO.Password, "Some_kind_of_secret");

            if (token is null)
                return BadRequest();
            return Ok(new TokenDTO() { AccessToken = token });
        }

        [HttpGet("Profile")]
        [Authorize]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public async Task<ActionResult<UserDTO>> GetProfile()
        {
            var user = _userRepository.GetById(GetUserId());
            var res = _mapper.Map<UserDTO>(user);
            res.Employee.Status = _employeeRepostiory.GetEmployeeStatus(user.Employee);
            return Ok(res);
        }

        [HttpPut("Profile")]
        [Authorize(Roles = "Admin,Manager,Employee")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
        public IActionResult UpdateProfile(EmployeeDTO employeeData)
        {
            var user = _userRepository.GetById(GetUserId());

            var newEmployee = _mapper.Map<Employee>(employeeData);

            _userRepository.UpdateProfile(user, newEmployee);
            try
            {
                _unitOfWork.Commit();
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
                throw;
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Delete))]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userRepository.Delete(id);
            if (user is null)
                return NotFound();
            return Ok();
        }

        [ApiConventionMethod(typeof(CustomApiConventions), nameof(CustomApiConventions.Interact))]
        [Authorize(Roles = "Admin,Manager")]
        [HttpPost("Roles")]
        public async Task<IActionResult> AddToRole(string userName, string role)
        {
            if (!User.IsInRole("Admin") && role.Normalize() == "Admin".Normalize())
                return Forbid();

            var resRole = await _userRepository.AddToRole(userName, role);
            if (resRole is null)
                return NotFound();

            return NoContent();
        }
    }
}
