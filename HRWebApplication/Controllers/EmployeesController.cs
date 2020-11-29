using AutoMapper;
using HRData.Data;
using HRData.Models;
using HRData.Models.JobModels;
using HRData.Repositories;
using HRWebApplication.DTO;
using Microsoft.AspNetCore.Http;
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
        private readonly IEmployeeRepostiory _employeeRepo;
        #region Constructor
        public EmployeesController(ApplicationDbContext context, IMapper mapper, IEmployeeRepostiory employeeRepostiory) : base(context, mapper)
        {
            this._employeeRepo = employeeRepostiory;
            this._employees = _context.Set<Employee>();
        }
        #endregion

        #region Profile
        [HttpGet(Name = "[controller]_GetAll")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public IEnumerable<EmployeeDTO> GetAll()
        {
            var employees = _employeeRepo.GetActiveEmployees();
            return from e in employees
                   select new EmployeeDTO()
                   {
                       Address = e.Address,
                       CurrentAddress = e.CurrentAddress,
                       DateOfBirth = e.DateOfBirth,
                       FirstName = e.FirstName,
                       LastName = e.LastName,
                       NationalId = e.NationalId,
                       PersonalEmail = e.PersonalEmail,
                       Phone = e.Phone,
                       Sex = e.Sex,
                       WorkEmail = e.WorkEmail,
                       Status = _employeeRepo.GetEmployeeStatus(e)
                   };
        }

        [HttpGet("{id}", Name = "GetEmployeeById")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public ActionResult<EmployeeDTO> Get(int id)
        {
            var employee = _employees.Find(id);
            if (employee is null)
                return NotFound();
            return new EmployeeDTO()
            {
                Address = employee.Address,
                CurrentAddress = employee.CurrentAddress,
                DateOfBirth = employee.DateOfBirth,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                NationalId = employee.NationalId,
                PersonalEmail = employee.PersonalEmail,
                Phone = employee.Phone,
                Sex = employee.Sex,
                WorkEmail = employee.WorkEmail,
                Status = _employeeRepo.GetEmployeeStatus(employee)
            };
        }

        [HttpPost(Name = "CreateEmployee")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Post))]
        public ActionResult<EmployeeDTO> Post([FromBody] EmployeeDTO data)
        {
            var newEmployee = _mapper.Map<Employee>(data);

            _employeeRepo.AddEmployee(newEmployee);
            Commit();
            var res = _mapper.Map<EmployeeDTO>(newEmployee);
            return CreatedAtAction("Get", new { id = newEmployee.Id }, res);
        }

        [HttpPut("{id}", Name = "UpdateEmployeeById")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
        public ActionResult Put(int id, [FromBody] EmployeeDTO value)
        {
            if (value.Id != id)
                return BadRequest();
            var em = _mapper.Map<Employee>(value);
            _employeeRepo.Update(em);
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

        [HttpDelete("{id}", Name = "DeleteEmployeeById")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Delete))]
        public ActionResult Delete(int id)
        {
            var em = _employees.Find(id);
            if (em is null)
                return NotFound();
            _employeeRepo.Delete(em);
            try
            {
                Commit();
            }
            catch (Exception)
            {
                return Forbid();
                throw;
            }
            return Ok();
        }
        #endregion

        #region Position
        [HttpGet("{id}/positions", Name = "[controller]_GetPosition")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public ActionResult<IEnumerable<PositionDTO>> GetPosition(int id)
        {
            var employee = _employees.Find(id);
            if (employee is null)
                return NotFound();
            return _mapper.Map<List<PositionDTO>>(_employeeRepo.GetPositions(employee));
        }

        [HttpGet("{id}/positions/{positionId}", Name = "[controller]_GetPositionById")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public ActionResult<IEnumerable<PositionDTO>> GetPositionById(int id, int positionId)
        {
            var employee = _employees.Find(id);
            if (employee is null)
                return NotFound();
            return _mapper.Map<List<PositionDTO>>(_employeeRepo.GetPositionById(employee, positionId));
        }

        [HttpGet("{id}/positions/current", Name = "[controller]_GetCurrentPosition")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public ActionResult<PositionDTO> GetCurrentPosition(int id)
        {
            var employee = _employees.Find(id);
            if (employee is null)
                return NotFound();
            return _mapper.Map<PositionDTO>(_employeeRepo.GetCurentPosition(employee));
        }

        [HttpPost("{id}/positions", Name = "[controller]_AddToPosition")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Post))]
        public ActionResult<PositionDTO> AddToPosition(int id, [FromBody] PositionDTO data)
        {
            var employee = _employees.Find(id);
            if (employee is null)
                return NotFound();

            //Manual mapping Position to avoid record status bug
            var position = new Position()
            {
                Employee = employee,
                StartDate = data.StartDate,
                EndDate = data.EndDate,
                Salary = data.Salary,
                JobTitle = _context.JobTitles.Find(data.JobTitle.Id),
                WorkType = _context.WorkType.Find(data.WorkType.Id),
                Unit = _context.OrganizationUnits.Find(data.Unit.Id)
            };

            _employeeRepo.NewPosition(employee, position);

            Commit();
            return CreatedAtAction("GetPositionById", new { id = employee.Id, positionId = position.Id }, _mapper.Map<PositionDTO>(position));
        }

        [HttpDelete("{id}/positions/{positionId}", Name = "[controller]_DeletePosition")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Delete))]
        public ActionResult DeletePosition(int id, int positionId)
        {
            var employee = _employees.Find(id);
            if (employee is null)
                return NotFound();
            var position = employee.Positions.FirstOrDefault(po => po.Id == positionId);
            if (position is null)
                return NotFound();
            _employeeRepo.DeletePosition(employee, position);
            Commit();
            return Ok();
        }

        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [HttpPost("{id}/positions/leave", Name = "[controller]_Leave")]
        public ActionResult<PositionDTO> TerminateEmployment(int id, LeaveDetailDTO leaveDetail)
        {
            var employee = _employees.Find(id);
            if (employee is null)
                return NotFound();

            if (!_employeeRepo.IsWorking(employee))
                return BadRequest();

            var leaveType = _context.LeaveTypes.Find(leaveDetail.Type.Id);
            var detail = new LeaveDetail()
            {
                RecordStatus = RecordStatus.Active,
                Date = leaveDetail.Date,
                Reason = leaveDetail.Reason,
                Type = leaveType
            };
            _employeeRepo.EmployeeLeave(employee, detail);
            Commit();
            return NoContent();
        }
        #endregion
    }
}
