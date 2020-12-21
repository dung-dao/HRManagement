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
        private readonly UserManager<IdentityUser> _usermanager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UsersController(
            UserManager<IdentityUser> usermanager,
            RoleManager<IdentityRole> roleManager
            )
        {
            _usermanager = usermanager;
            _roleManager = roleManager;
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpGet]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public IEnumerable<UserDTO> Get()
        {
            return from u in _usermanager.Users
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
            var user = _usermanager.Users.FirstOrDefault(e => e.Id == id);
            if (user is null)
                return NotFound();
            return new UserDTO() { Id = user.Id, UserName = user.UserName, Password = null, Email = user.Email };
        }

        [ApiConventionMethod(typeof(CustomApiConventions), nameof(CustomApiConventions.Perform))]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserDTO user)
        {
            var newUser = new IdentityUser()
            {
                UserName = user.UserName,
                Email = user.Email
            };
            var res = await _usermanager.CreateAsync(newUser, user.Password);
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
            var user = await _usermanager.FindByNameAsync(userDTO.UserName);
            if (user != null && await _usermanager.CheckPasswordAsync(user, userDTO.Password))
            {
                //Get roles
                var roles = await _usermanager.GetRolesAsync(user);

                var claims = from r in roles select new Claim(ClaimTypes.Role, r);
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
                return Ok(new { access_token });
            }
            else
                return BadRequest();
        }

        [HttpGet("Profile")]
        [Authorize]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.Claims.First(e => e.Type == "UserId").Value;
            var user = await _usermanager.FindByIdAsync(userId);
            return Ok(new { UserName = user.UserName, Email = user.Email });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Delete))]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _usermanager.FindByIdAsync(id);
            if (user is null)
                return NotFound();
            await _usermanager.DeleteAsync(user);
            return Ok();
        }

        [ApiConventionMethod(typeof(CustomApiConventions), nameof(CustomApiConventions.Interact))]
        [Authorize(Roles = "Admin,Manager")]
        [HttpPut("Role")]
        public async Task<IActionResult> AddToRole(string userName, string role)
        {
            var user = await _usermanager.FindByNameAsync(userName);
            if (user is null)
                return NotFound();

            var dbRole = await _roleManager.FindByNameAsync(role);
            if (dbRole is null)
                return NotFound();

            if (!User.IsInRole("Admin") && role.Normalize() == "Admin".Normalize())
                return Forbid();

            try
            {
                await _usermanager.AddToRoleAsync(user, dbRole.Name);
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500);
                throw;
            }
        }
    }
}
