using AutoMapper;
using HRData.Data;
using HRData.Models;
using HRData.Models.JobModels;
using HRWebApplication.DTO;
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
    public class EmployeesController : APIController
    {
        private readonly DbSet<Employee> _employees;
        public EmployeesController(ApplicationDbContext context, IMapper mapper) : base(context, mapper)
        {
            this._employees = _context.Set<Employee>();
        }

        [HttpGet(Name = "GetAll[controller]")]
        public IEnumerable<EmployeeDTO> GetAll()
        {
            return _mapper.Map<List<EmployeeDTO>>(_employees.ToList());
        }

        [HttpGet("{id}")]
        public ActionResult<EmployeeDTO> Get(int id)
        {
            var employee = _employees.Find(id);
            if (employee is null)
                return NotFound();
            return _mapper.Map<EmployeeDTO>(employee);
        }

        [HttpGet("{id}/positions")]
        public ActionResult<IEnumerable<PositionDTO>> GetPosition(int id)
        {
            var employee = _employees.Find(id);
            if (employee is null)
                return NotFound();
            var positions = employee.Positions.OrderBy(po => po.StartDate);
            return _mapper.Map<List<PositionDTO>>(positions);
        }

        [HttpPost("{id}/positions")]
        public ActionResult<PositionDTO> AddToNewPosition(int id, [FromBody] PositionDTO data)
        {
            var employee = _employees.Find(id);
            if (employee is null)
                return NotFound();

            var po = _mapper.Map<Position>(data);
            employee.Positions.Add(po);
            Commit();
            return _mapper.Map<PositionDTO>(po);
        }

        [HttpDelete("{id}/positions/{positionId}")]
        public ActionResult DeletePosition(int id, int positionId)
        {
            var employee = _employees.Find(id);
            if (employee is null)
                return NotFound();
            var position = employee.Positions.FirstOrDefault(po => po.Id == positionId);
            if (position is null)
                return NotFound();
            _context.Positions.Remove(position);
            Commit();
            return NoContent();
        }

        [HttpPost]
        public ActionResult<EmployeeDTO> Post([FromBody] EmployeeDTO data)
        {
            var newEmployee = _mapper.Map<Employee>(data);
            _employees.Add(newEmployee);
            Commit();
            return _mapper.Map<EmployeeDTO>(newEmployee);
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] EmployeeDTO value)
        {
            if (value.Id != id)
                return BadRequest();
            var em = _mapper.Map<Employee>(value);
            _context.Entry(em).State = EntityState.Modified;
            try
            {
                Commit();
            }
            catch (Exception)
            {
                if (!Exists<Employee>(id))
                    return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var em = _employees.Find(id);
            if (em is null)
                return NotFound();
            _employees.Remove(em);
            Commit();
            return NoContent();
        }
    }
}
