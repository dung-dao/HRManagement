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
            return User.Claims.First(e => e.Type == "UserId").Value;
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
            return new UserDTO() { Id = user.Id, UserName = user.UserName, Password = null, Email = user.Email };
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
            var res = await _userRepository.Create(newUser, user.Password);
            if (!res.Succeeded)
            {
                return BadRequest();
            }

            return NoContent();
        }

        [ApiConventionMethod(typeof(CustomApiConventions), nameof(CustomApiConventions.Interact))]
        [HttpPost("Login", Name = "Login")]
        public async Task<ActionResult<TokenDTO>> Login(LoginDTO userDTO)
        {
            var user = await _usermanager.FindByNameAsync(userDTO.UserName);
            if (user is null) return BadRequest();

            if (await _usermanager.CheckPasswordAsync(user, userDTO.Password))
            {
                //Get roles
                var roles = await _usermanager.GetRolesAsync(user);

                var claims = roles.Select(role => new Claim(ClaimTypes.Role, role));
                claims.Append(new Claim("UserId", user.Id.ToString()));

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Some_kind_of_secret")), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var access_token = tokenHandler.WriteToken(securityToken);
                return Ok(new TokenDTO() { AccessToken = access_token });
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("Profile", Name = "Profile")]
        [Authorize]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public IActionResult GetProfile()
        {
            var userId = GetUserId();
            var user = _userRepository.GetById(userId);
            return Ok(_mapper.Map<UserDTO>(user));
        }

        [HttpPut("Profile")]
        [Authorize(Roles = "Admin,Manager,Employee")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
        public IActionResult UpdateProfile(EmployeeDTO employeeData)
        {
            var userId = GetUserId();
            var user = _userRepository.GetById(userId);

            var newEmployee = _mapper.Map<Employee>(employeeData);

            _employeeRepostiory.AddEmployee(newEmployee);
            _unitOfWork.Commit();

            user.Employee = newEmployee;
            _unitOfWork.Commit();
            return NoContent();
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
