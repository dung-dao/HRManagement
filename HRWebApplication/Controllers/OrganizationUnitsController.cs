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
using Microsoft.AspNetCore.Identity.UI.V4.Pages.Internal.Account.Manage;

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

        [HttpGet(Name = "[controller]_GetAll")]
        public IEnumerable<OrganizationUnitDTO> GetDepartments()
        {
            var data = _context.OrganizationUnits.ToList();
            return _mapper.Map<List<OrganizationUnitDTO>>(data);
        }

        [HttpGet("{id}", Name = "[controller]_GetById")]
        public async Task<ActionResult<OrganizationUnitDTO>> GetOrganizationUnit(int id)
        {
            var organizationUnit = await _context.OrganizationUnits.FindAsync(id);

            if (organizationUnit == null)
            {
                return NotFound();
            }

            var unitDTO = _mapper.Map<OrganizationUnitDTO>(organizationUnit);
            unitDTO.EmployeeNo = organizationUnit.Employees.Count;
            return unitDTO;
        }

        [HttpPut("{id}", Name = "[controller]_Update")]
        public async Task<IActionResult> PutOrganizationUnit(int id, OrganizationUnitDTO data)
        {
            if (id != data.Id)
            {
                return BadRequest();
            }

            var organizationUnit = _mapper.Map<OrganizationUnit>(data);

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

        [HttpPost(Name = "[controller]_CreateRootUnit")]
        public async Task<ActionResult<OrganizationUnitDTO>> PostOrganizationUnit(OrganizationUnitDTO data)
        {
            var organizationUnit = ToEntity(data);
            _context.OrganizationUnits.Add(organizationUnit);
            await _context.SaveChangesAsync();
            var res = _mapper.Map<OrganizationUnitDTO>(organizationUnit);

            return CreatedAtAction("GetOrganizationUnit", new { id = organizationUnit.Id }, res);
        }

        [HttpPost("{id}/children", Name = "[controller]_CreateUnit")]
        public ActionResult<OrganizationUnitDTO> CreateUnit(int id, OrganizationUnitDTO unit)
        {
            var parent = _context.OrganizationUnits.Find(id);
            if (parent is null)
                return NotFound("Parent not found");

            var newUnit = _mapper.Map<OrganizationUnit>(unit);
            parent.Children.Add(newUnit);
            _context.SaveChanges();
            var res = _mapper.Map<OrganizationUnitDTO>(newUnit);
            return CreatedAtAction("GetOrganizationUnit", new { id = newUnit.Id }, res);
        }

        [HttpPut("{id}/parent", Name = "[controller]_ChangeParent")]
        public ActionResult<OrganizationUnitDTO> ChangeParent(int id, OrganizationUnitDTO newParent)
        {
            var unit = _context.OrganizationUnits.Find(id);
            if (unit is null)
                return NotFound();
            
            var parent = _context.OrganizationUnits.Find(newParent.Id);
            if (parent is null)
                return BadRequest();

            parent.Children.Add(unit);
            _context.SaveChanges();

            var res = _mapper.Map<OrganizationUnitDTO>(unit);
            return CreatedAtAction("GetOrganizationUnit", new { id = res.Id }, res);
        }

        private OrganizationUnit ToEntity(OrganizationUnitDTO data)
        {
            return _mapper.Map<OrganizationUnit>(data);
        }

        [HttpDelete("{id}", Name = "[controller]_Delete")]
        public async Task<IActionResult> DeleteOrganizationUnit(int id)
        {
            var unit = await _context.OrganizationUnits.FindAsync(id);
            if (unit == null)
            {
                return NotFound();
            }

            unit.Children.RemoveAll(p => true);
            _context.OrganizationUnits.Remove(unit);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrganizationUnitExists(int id)
        {
            return _context.OrganizationUnits.Any(e => e.Id == id);
        }
    }
}
