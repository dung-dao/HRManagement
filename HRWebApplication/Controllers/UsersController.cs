using AutoMapper;
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
            var claim = User.Claims.FirstOrDefault(e => e.Type == "UserId");
            if (claim is null)
                return null;
            return claim.Value;
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpGet(Name = "GetListUsers")]
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
        [HttpGet("{id}", Name = "GetUserInfoById")]
        [Authorize(Roles = "Admin,Manager")]
        public ActionResult<UserDTO> Get(string id)
        {
            var user = _userRepository.GetById(id);
            if (user is null)
                return NotFound();
            return new UserDTO() { Id = user.Id, UserName = user.UserName, Password = null, Email = user.Email, Employee = _mapper.Map<EmployeeDTO>(user.Employee) };
        }

        [ApiConventionMethod(typeof(CustomApiConventions), nameof(CustomApiConventions.Perform))]
        [HttpPost(Name = "SignUp")]
        public async Task<IActionResult> Register([FromBody] UserDTO user)
        {
            var newUser = new User()
            {
                UserName = user.UserName,
                Email = user.Email
            };

            var employee = user.Employee;
            if (employee is null)
                return BadRequest();


            var res = await _userRepository.Create(newUser, user.Password);
            if (!res.Succeeded)
            {
                return BadRequest();
            }

            var newEmployee = _mapper.Map<Employee>(user.Employee);
            newEmployee.RecordStatus = RecordStatus.Active;
            _employeeRepostiory.AddEmployee(newEmployee);
            newEmployee.User = newUser;
            _unitOfWork.Save();

            return CreatedAtAction("Get", new { id = newUser.Id }, _mapper.Map<UserDTO>(newUser));
        }

        [ApiConventionMethod(typeof(CustomApiConventions), nameof(CustomApiConventions.Interact))]
        [HttpPost("Login", Name = "Login")]
        public async Task<ActionResult<TokenDTO>> Login(LoginDTO userDTO)
        {
            var token = await _userRepository.GenerateLoginToken(userDTO.UserName, userDTO.Password, "Some_kind_of_secret");

            if (token is null)
                return BadRequest();
            return Ok(new TokenDTO() { AccessToken = token });
        }

        [HttpPut("Password", Name="ChangePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromQuery] string password, [FromQuery] string newpassword)
        {
            var user = _userRepository.GetById(GetUserId());

            var res = await _userRepository.ChangePassword(user, password, newpassword);

            if (res.Succeeded)
                return NoContent();
            else
                return BadRequest();
        }

        [HttpGet("Profile", Name = "Profile")]
        [Authorize]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public ActionResult<UserDTO> GetProfile()
        {
            var userId = GetUserId();
            if (userId is null)
                return Unauthorized();
            var user = _userRepository.GetById(userId);
            var res = _mapper.Map<UserDTO>(user);
            if (user.Employee is not null)
                res.Employee.Status = _employeeRepostiory.GetEmployeeStatus(user.Employee);
            return Ok(res);
        }

        [HttpPut("UpdateProfile")]
        [Authorize(Roles = "Admin,Manager,User")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
        public IActionResult UpdateProfile(EmployeeDTO employeeData)
        {
            var user = _userRepository.GetById(GetUserId());

            var newEmployee = _mapper.Map<Employee>(employeeData);

            _userRepository.UpdateProfile(user, newEmployee);
            try
            {
                _unitOfWork.Save();
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
                throw;
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}", Name = "Delete")]
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
