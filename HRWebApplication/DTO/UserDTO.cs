using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace HRWebApplication.DTO
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public EmployeeDTO Employee { get; set; }
        // public IEnumerable<string> Roles { get; set; }
        public string Role { get; set; }
    }
}
