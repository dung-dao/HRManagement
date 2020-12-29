using HRData.Data;
using HRData.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Repositories
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAll();
        void UpdateProfile(User user, Employee employee);
        Task<IdentityResult> ChangePassword(User user, string password, string newpassword);
        User GetById(string Id);
        Task<IdentityResult> Create(User user, string password);
        Task<string> GenerateLoginToken(string username, string password, string secret);
        Task<User> Delete(string id);
        Task<string> AddToRole(string username, string role);
    }
    public class UserRepository : Repository, IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserRepository(
            ApplicationDbContext context,
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager
            ) : base(context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<string> AddToRole(string username, string role)
        {
            var user = await _userManager.FindByNameAsync(username);
            var dbRole = await _roleManager.FindByNameAsync(role);

            if (user is null || dbRole is null)
                return null;

            await _userManager.AddToRoleAsync(user, dbRole.Name);
            return role;
        }

        public async Task<IdentityResult> ChangePassword(User user, string password, string newpassword)
        {
            return await _userManager.ChangePasswordAsync(user, password, newpassword);
        }

        public async Task<IdentityResult> Create(User user, string password)
        {
            return await _userManager.CreateAsync(user, password);
        }

        public async Task<User> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user is not null)
                await _userManager.DeleteAsync(user);
            return user;
        }

        public async Task<string> GenerateLoginToken(string username, string password, string secret)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user is null)
                return null;

            var passwordCorrect = await _userManager.CheckPasswordAsync(user, password);
            if (!passwordCorrect)
                return null;

            var roles = await _userManager.GetRolesAsync(user);
            var claims = new List<Claim>();
            foreach (var item in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, item));
            }
            claims.Add(new Claim("UserId", user.Id));
            claims.Add(new Claim("username", user.UserName));
            claims.Add(new Claim("email", user.Email));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var access_token = tokenHandler.WriteToken(securityToken);
            return access_token;
        }

        public IEnumerable<User> GetAll()
        {
            return _userManager.Users.ToList();
        }

        public User GetById(string Id)
        {
            return _userManager.Users.FirstOrDefault(e => e.Id == Id);
        }

        public void UpdateProfile(User user, Employee employee)
        {
            var profile = user.Employee;
            if (profile is null)
            {
                employee.RecordStatus = RecordStatus.Active;
                _context.Employees.Add(employee);
                user.Employee = employee;
            }
            else
            {
                profile.FirstName = employee.FirstName;
                profile.LastName = employee.LastName;
                profile.PersonalEmail = employee.PersonalEmail;
                profile.WorkEmail = employee.WorkEmail;
                profile.Phone = employee.Phone;
                profile.DateOfBirth = employee.DateOfBirth;
                profile.Sex = employee.Sex;
                profile.Address = employee.Address;
                profile.CurrentAddress = employee.CurrentAddress;
                profile.NationalId = employee.NationalId;
            }
        }
    }
}
