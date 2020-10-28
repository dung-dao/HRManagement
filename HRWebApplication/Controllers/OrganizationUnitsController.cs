using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRData.Data;
using HRData.Models;

namespace HRWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationUnitsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrganizationUnitsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/OrganizationUnits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrganizationUnit>>> GetDepartments()
        {
            return await _context.Departments.ToListAsync();
        }

        // GET: api/OrganizationUnits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrganizationUnit>> GetOrganizationUnit(int id)
        {
            var organizationUnit = await _context.Departments.FindAsync(id);

            if (organizationUnit == null)
            {
                return NotFound();
            }

            return organizationUnit;
        }

        // POST: api/OrganizationUnits
        [HttpPost]
        public async Task<ActionResult<OrganizationUnit>> PostOrganizationUnit(OrganizationUnit organizationUnit)
        {
            _context.Departments.Add(organizationUnit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrganizationUnit", new { id = organizationUnit.Id }, organizationUnit);
        }

        // DELETE: api/OrganizationUnits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrganizationUnit(int id)
        {
            var organizationUnit = await _context.Departments.FindAsync(id);
            if (organizationUnit == null)
            {
                return NotFound();
            }

            _context.Departments.Remove(organizationUnit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrganizationUnitExists(int id)
        {
            return _context.Departments.Any(e => e.Id == id);
        }
    }
}
