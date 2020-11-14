using AutoMapper;
using HRData.Data;
using HRData.Models;
using HRData.Models.JobModels;
using HRData.Repositories;
using HRWebApplication.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HRWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : APIController
    {
        private readonly DbSet<Employee> _employees;
        private readonly IEmployeeRepostiory _empRepostiory;
        public EmployeesController(ApplicationDbContext context, IMapper mapper, IEmployeeRepostiory employeeRepostiory) : base(context, mapper)
        {
            this._empRepostiory = employeeRepostiory;
            this._employees = _context.Set<Employee>();
        }

        #region Profile
        [HttpGet(Name = "[controller]_GetAll")]
        public IEnumerable<EmployeeDTO> GetAll()
        {
            var employees = _empRepostiory.GetActiveEmployee();
            return ToListEmployeeDTO(employees);
        }

        private List<EmployeeDTO> ToListEmployeeDTO(List<Employee> employees)
        {
            return _mapper.Map<List<EmployeeDTO>>(employees);
        }

        [HttpGet("{id}", Name = "[Controller]_GetById")]
        public ActionResult<EmployeeDTO> Get(int id)
        {
            var employee = _employees.Find(id);
            if (employee is null)
                return NotFound();
            return _mapper.Map<EmployeeDTO>(employee);
        }

        [HttpPost(Name = "[controller]_Create")]
        public ActionResult<EmployeeDTO> Post([FromBody] EmployeeDTO data)
        {
            var newEmployee = _mapper.Map<Employee>(data);

            _empRepostiory.AddEmployee(newEmployee);
            Commit();
            return _mapper.Map<EmployeeDTO>(newEmployee);
        }

        [HttpPut("{id}", Name = "[controller]_Update")]
        public ActionResult Put(int id, [FromBody] EmployeeDTO value)
        {
            if (value.Id != id)
                return BadRequest();
            var em = _mapper.Map<Employee>(value);
            _empRepostiory.Update(em);
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

        [HttpDelete("{id}", Name = "[controller]_Delete")]
        public ActionResult Delete(int id)
        {
            var em = _employees.Find(id);
            if (em is null)
                return NotFound();
            _employees.Remove(em);
            try
            {
                Commit();
            }
            catch (Exception)
            {
                return Forbid();
                throw;
            }
            return NoContent();
        }
        #endregion

        #region Position
        [HttpGet("{id}/positions", Name = "[controller]_GetPosition")]
        public ActionResult<IEnumerable<PositionDTO>> GetPosition(int id)
        {
            var employee = _employees.Find(id);
            if (employee is null)
                return NotFound();
            return _mapper.Map<List<PositionDTO>>(_empRepostiory.GetPositions(employee));
        }

        [HttpPost("{id}/positions", Name = "[controller]_AddToPosition")]
        public ActionResult<PositionDTO> AddToPosition(int id, [FromBody] PositionDTO data)
        {
            var employee = _employees.Find(id);
            if (employee is null)
                return NotFound();

            var po = _mapper.Map<Position>(data);

            _empRepostiory.NewPosition(employee, po);

            Commit();
            return _mapper.Map<PositionDTO>(po);
        }
        
        [HttpDelete("{id}/positions/{positionId}", Name = "[controller]_DeletePosition")]
        public ActionResult DeletePosition(int id, int positionId)
        {
            var employee = _employees.Find(id);
            if (employee is null)
                return NotFound();
            var position = employee.Positions.FirstOrDefault(po => po.Id == positionId);
            if (position is null)
                return NotFound();
            _empRepostiory.DeletePosition(employee, position);
            Commit();
            return NoContent();
        }

        [HttpPost("{id}/positions/leave", Name = "[controller]_Leave")]
        public ActionResult<PositionDTO> Leave(int id, LeaveDetailDTO leaveDetail)
        {
            var employee = _employees.Find(id);
            if (employee is null)
                return NotFound();

            var detail = _mapper.Map<LeaveDetail>(leaveDetail);
            _empRepostiory.EmployeeLeave(employee, detail);
            Commit();
            return NoContent();
        }
        #endregion
    }
}
