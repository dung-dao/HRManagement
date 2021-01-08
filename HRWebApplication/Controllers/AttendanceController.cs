using HRData.Models;
using HRData.Models.SalaryModels;
using HRData.Repositories;
using HRWebApplication.DTO.TimeSheet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ApiControllerBase
    {
        private readonly ISalaryRepository _salaryRepository;
        private readonly IUnitOfWork _unitOfWork;

        public AttendanceController(
            IUserRepository userRepository,
            ISalaryRepository salaryRepository, 
            IUnitOfWork unitOfWork
            ) : base(userRepository)
        {
            _salaryRepository = salaryRepository;
            _unitOfWork = unitOfWork;
        }

        #region MyAttendance
        [HttpGet("Me")]
        public ActionResult<IEnumerable<AttendanceDTO>> GetMyAttendance()
        {
            var user = GetAuthorizedUser();
            if (user is null)
                return Unauthorized();

            var logs = _salaryRepository.GetAttendanceList(user.Employee);

            return logs.Select(e => new AttendanceDTO()
            {
                Id = e.Id,
                Date = e.Date,
                Duration = e.Duration,
                Note = e.Note
            }).ToList();
        }

        [HttpGet("Me/{id}")]
        public ActionResult<AttendanceDTO> GetMyAttendanceById(int id)
        {
            var user = GetAuthorizedUser();
            if (user is null)
                return Unauthorized();

            WorkingLog attendance = _salaryRepository.GetAttendanceById(user.Employee, id);

            if (attendance is not null)
                return new AttendanceDTO()
                {
                    Id = attendance.Id,
                    Date = attendance.Date,
                    Duration = attendance.Duration,
                    Note = attendance.Note
                };
            return NotFound();
        }

        [HttpPost("Me")]
        public ActionResult<AttendanceDTO> PostMyAttendance([FromBody] AttendanceDTO data)
        {
            var user = GetAuthorizedUser();
            if (user is null)
                return Unauthorized();

            var newAttendance = new WorkingLog()
            {
                Type = WorkingLogType.Attendance,
                Date = data.Date,
                Duration = data.Duration,
                Note = data.Note,
                RecordStatus = RecordStatus.Active,
                Employee = user.Employee
            };

            _salaryRepository.CreateAttendance(newAttendance);
            _unitOfWork.Save();

            return CreatedAtAction("GetAttendanceById", new { id = data.Id }, newAttendance);
        }

        [HttpPut("Me/{id}")]
        public IActionResult UpdateAttendanceById(int id, AttendanceDTO data)
        {
            var user = GetAuthorizedUser();
            if (user is null)
                return Unauthorized();

            var updateAttendance = new WorkingLog()
            {
                Type = WorkingLogType.Attendance,
                Date = data.Date,
                Duration = data.Duration,
                Note = data.Note,
                RecordStatus = RecordStatus.Active,
                Employee = user.Employee
            };

            _salaryRepository.UpdateMyAttendance(user.Employee, updateAttendance);
            _unitOfWork.Save();

            return NoContent();
        }
        #endregion

        #region EmployeeAttendance
        [HttpGet]
        public ActionResult<IEnumerable<AttendanceDTO>> GetAttendance()
        {
            IEnumerable<WorkingLog> logs = _salaryRepository.GetAttendanceList();
            return logs.Select(e => new AttendanceDTO()
            {
                Id = e.Id,
                Date = e.Date,
                Duration = e.Duration,
                Note = e.Note
            }).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<AttendanceDTO> GetAttendanceById(int id)
        {
            WorkingLog attendance = _salaryRepository.GetAttendanceById(id);

            if (attendance is not null)
                return new AttendanceDTO()
                {
                    Id = attendance.Id,
                    Date = attendance.Date,
                    Duration = attendance.Duration,
                    Note = attendance.Note
                };
            return NotFound();
        }

        [HttpPost("{id}/approve")]
        public IActionResult Approve(int id)
        {
            _salaryRepository.ApproveLog(id);
            _unitOfWork.Save();
            return NoContent();
        }

        [HttpPost("{id}/reject")]
        public IActionResult Reject(int id)
        {
            _salaryRepository.RejectLog(id);
            _unitOfWork.Save();
            return NoContent();
        }
        #endregion
    }
}
