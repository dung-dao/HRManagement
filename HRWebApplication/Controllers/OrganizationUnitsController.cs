using AutoMapper;
using HRData.Data;
using HRData.Models.Organization;
using HRData.Repositories;
using HRWebApplication.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "admin")]
    public class OrganizationUnitsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IOrganizationRepository _organizationRepository;

        public OrganizationUnitsController(ApplicationDbContext context, IMapper mapper, IOrganizationRepository organizationRepository)
        {
            _context = context;
            _mapper = mapper;
            _organizationRepository = organizationRepository;
        }

        [HttpGet(Name = "[controller]_GetAll")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public IEnumerable<OrganizationUnitDTO> GetDepartments()
        {
            var data = _organizationRepository.GetActiveRecords();
            return _mapper.Map<List<OrganizationUnitDTO>>(data);
        }

        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        [HttpGet("{id}", Name = "[controller]_GetById")]
        public ActionResult<OrganizationUnitDTO> GetOrganizationUnit(int id)
        {
            var organizationUnit = _organizationRepository.GetById(id);

            if (organizationUnit == null)
            {
                return NotFound();
            }

            var unitDTO = _mapper.Map<OrganizationUnitDTO>(organizationUnit);
            unitDTO.EmployeeNo = organizationUnit.Employees.Count;
            return unitDTO;
        }

        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
        [HttpPut("{id}", Name = "[controller]_Update")]
        public IActionResult PutOrganizationUnit(int id, OrganizationUnitDTO data)
        {
            if (id != data.Id)
            {
                return BadRequest();
            }

            var organizationUnit = _mapper.Map<OrganizationUnit>(data);

            _organizationRepository.Update(organizationUnit);

            try
            {
                _context.SaveChanges();
            }
            catch (Exception)
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

        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Post))]
        [HttpPost(Name = "[controller]_CreateRootUnit")]
        public ActionResult<OrganizationUnitDTO> PostOrganizationUnit(OrganizationUnitDTO data)
        {
            var organizationUnit = ToEntity(data);
            _organizationRepository.Add(organizationUnit);
            _context.SaveChanges();
            var res = _mapper.Map<OrganizationUnitDTO>(organizationUnit);

            return CreatedAtAction("GetOrganizationUnit", new { id = organizationUnit.Id }, res);
        }

        [HttpPost("{id}/children", Name = "[controller]_CreateUnit")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Post))]
        public ActionResult<OrganizationUnitDTO> CreateUnit(int id, OrganizationUnitDTO unit)
        {
            var parent = _context.OrganizationUnits.Find(id);
            if (parent is null)
                return NotFound("Parent not found");

            var subUnit = _mapper.Map<OrganizationUnit>(unit);
            _organizationRepository.AddSubUnit(parent, subUnit);
            _context.SaveChanges();
            var res = _mapper.Map<OrganizationUnitDTO>(subUnit);
            return CreatedAtAction("GetOrganizationUnit", new { id = subUnit.Id }, res);
        }

        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
        [HttpPut("{id}/parent", Name = "[controller]_ChangeParent")]
        public ActionResult<OrganizationUnitDTO> ChangeParent(int id, OrganizationUnitDTO newParent)
        {
            var unit = _context.OrganizationUnits.Find(id);
            if (unit is null)
                return NotFound();

            var parent = _context.OrganizationUnits.Find(newParent.Id);
            if (parent is null)
                return BadRequest();

            _organizationRepository.ChangeParentUnit(unit, parent);
            try
            {
                _context.SaveChanges();
            }
            catch (System.Exception)
            {
                return StatusCode(500);
                throw;
            }

            return NoContent();
        }

        private OrganizationUnit ToEntity(OrganizationUnitDTO data)
        {
            return _mapper.Map<OrganizationUnit>(data);
        }

        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Delete))]
        [HttpDelete("{id}", Name = "[controller]_Delete")]
        public IActionResult DeleteOrganizationUnit(int id)
        {
            var unit = _context.OrganizationUnits.Find(id);
            if (unit == null)
            {
                return NotFound();
            }

            _organizationRepository.Delete(unit);
            _context.SaveChanges();

            return NoContent();
        }

        private bool OrganizationUnitExists(int id)
        {
            return _context.OrganizationUnits.Any(e => e.Id == id);
        }
    }
}
