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
        public async Task<ActionResult<IEnumerable<OrganizationUnit>>> GetOrganizationUnits()
        {
            return await _context.OrganizationUnits.ToListAsync();
        }

        // GET: api/OrganizationUnits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrganizationUnit>> GetOrganizationUnit(int id)
        {
            var organizationUnit = await _context.OrganizationUnits.FindAsync(id);

            if (organizationUnit == null)
            {
                return NotFound();
            }

            return organizationUnit;
        }

        // PUT: api/OrganizationUnits/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrganizationUnit(int id, OrganizationUnit organizationUnit)
        {
            if (id != organizationUnit.Id)
            {
                return BadRequest();
            }

            _context.Entry(organizationUnit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrganizationUnitExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OrganizationUnits
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrganizationUnit>> PostOrganizationUnit(OrganizationUnit organizationUnit)
        {
            _context.OrganizationUnits.Add(organizationUnit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrganizationUnit", new { id = organizationUnit.Id }, organizationUnit);
        }

        // DELETE: api/OrganizationUnits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrganizationUnit(int id)
        {
            var organizationUnit = await _context.OrganizationUnits.FindAsync(id);
            if (organizationUnit == null)
            {
                return NotFound();
            }

            DeleteOrgUnit(organizationUnit, _context);            

            await _context.SaveChangesAsync();

            return NoContent();

            #region RecursiveDelete
            void DeleteOrgUnit(OrganizationUnit unit, ApplicationDbContext context)
            {
                var children = unit.Children;
                if (children.Count > 0)
                {
                    foreach (var child in children)
                    {
                        DeleteOrgUnit(child, context);
                    }
                }
                context.OrganizationUnits.Remove(unit);
            }
            #endregion
        }

        private bool OrganizationUnitExists(int id)
        {
            return _context.OrganizationUnits.Any(e => e.Id == id);
        }
    }
}
