using HRWebApplication.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public RolesController(
            RoleManager<IdentityRole> roleManager
            )
        {
            _roleManager = roleManager;
        }

        [HttpGet]
        public List<IdentityRole> GetIdentityRoles() => _roleManager.Roles.ToList();

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateRole([FromBody] RoleDTO roleData)
        {
            var role = new IdentityRole(roleData.Name);
            await _roleManager.CreateAsync(role);
            return Ok();
        }
    }
}
