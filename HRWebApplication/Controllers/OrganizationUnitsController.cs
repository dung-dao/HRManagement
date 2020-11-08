using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRData.Data;
using HRData.Models;
using HRData.Models.Organization;
using HRWebApplication.DTO;
using AutoMapper;
using HRData.Repositories;

namespace HRWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationUnitsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IOrganizationRepository _orgRepo;

        public OrganizationUnitsController(ApplicationDbContext context, IMapper mapper, IOrganizationRepository orgRepo)
        {
            _context = context;
            _mapper = mapper;
            _orgRepo = orgRepo;
        }

        // GET: api/OrganizationUnits
        [HttpGet(Name = "[controller]_GetAll")]
        public async Task<ActionResult<IEnumerable<OrganizationUnit>>> GetDepartments()
        {
            return await _context.OrganizationUnits.ToListAsync();
        }

        // GET: api/OrganizationUnits/5
        [HttpGet("{id}", Name = "[controller]_GetById")]
        public async Task<ActionResult<OrganizationUnitDTO>> GetOrganizationUnit(int id)
        {
            var organizationUnit = await _context.OrganizationUnits.FindAsync(id);

            if (organizationUnit == null)
            {
                return NotFound();
            }

            var unitDTO = _mapper.Map<OrganizationUnitDTO>(organizationUnit);
            unitDTO.EmployeeNo = _orgRepo.GetEmployeeNumber(id);

            return unitDTO;
        }

        [HttpPut("{id}", Name = "[controller]_Update")]
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
        [HttpPost(Name = "[controller]_Create")]
        public async Task<ActionResult<OrganizationUnit>> PostOrganizationUnit(OrganizationUnit organizationUnit)
        {
            _context.OrganizationUnits.Add(organizationUnit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrganizationUnit", new { id = organizationUnit.Id }, organizationUnit);
        }

        // DELETE: api/OrganizationUnits/5
        [HttpDelete("{id}", Name = "[controller]_Delete")]
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
