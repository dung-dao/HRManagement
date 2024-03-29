﻿using AutoMapper;
using HRData.Models;
using HRData.Models.SalaryModels;
using HRData.Repositories;
using HRWebApplication.DTO;
using HRWebApplication.DTO.TimeSheet;
using HRWebApplication.Helpers.ApiConventions;
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
        private readonly IMapper _mapper;

        public AttendanceController(
            IUserRepository userRepository,
            ISalaryRepository salaryRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork
            ) : base(userRepository)
        {
            _salaryRepository = salaryRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        #region MyAttendance
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        [HttpGet("Me", Name = "GetMyAttendance")]
        public ActionResult<IEnumerable<AttendanceDTO>> GetMyAttendance()
        {
            var user = GetAuthorizedUser();
            if (user is null)
                return Unauthorized();

            var logs = _salaryRepository.GetEmployeeAttendanceList(user.Employee);

            return logs.Select(e => new AttendanceDTO()
            {
                Id = e.Id,
                Date = e.Date,
                Duration = e.Duration,
                Note = e.Note,
                LogStatus = e.LogStatus
            }).ToList();
        }

        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        [HttpGet("Me/{id}", Name = "GetMyAttendanceById")]
        public ActionResult<AttendanceDTO> GetMyAttendanceById(int id)
        {
            var user = GetAuthorizedUser();
            if (user is null)
                return Unauthorized();

            WorkingLog attendance = _salaryRepository.GetAttendanceById(id);
            if (attendance.Employee.Id != user.Employee.Id)
                return Unauthorized();

            if (attendance is not null)
                return new AttendanceDTO()
                {
                    Id = attendance.Id,
                    Date = attendance.Date,
                    Duration = attendance.Duration,
                    Note = attendance.Note,
                    LogStatus = attendance.LogStatus
                };
            return NotFound();
        }

        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Post))]
        [HttpPost("Me", Name = "PostMyAttendance")]
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
                RecordStatus = RecordStatus.Active
            };

            var res = new AttendanceDTO()
            {
                Id = newAttendance.Id,
                Date = newAttendance.Date,
                Duration = newAttendance.Duration,
                Note = newAttendance.Note,
                LogStatus = newAttendance.LogStatus
            };

            _salaryRepository.CreateAttendance(newAttendance, user.Employee);
            _unitOfWork.Save();

            return CreatedAtAction("GetAttendanceById", new { id = data.Id }, res);
        }

        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
        [HttpPut("Me/{id}", Name = "UpdateMyAttendanceById")]
        public IActionResult UpdateMyAttendanceById(int id, [FromBody] AttendanceDTO data)
        {
            var user = GetAuthorizedUser();
            if (user is null)
                return Unauthorized();

            var log = _salaryRepository.GetWorkingLogById(data.Id);
            if (log.Employee.Id != user.Employee.Id)
                return Unauthorized();

            var update = new WorkingLog()
            {
                Date = data.Date,
                Duration = data.Duration,
                Note = data.Note,
            };

            _salaryRepository.UpdateAttendance(log, update);
            _unitOfWork.Save();

            return NoContent();
        }


        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Delete))]
        [HttpDelete("Me/{id}", Name = "DeleteMyAttendanceById")]
        public IActionResult DeleteMyAttendanceById(int id)
        {
            var user = GetAuthorizedUser();
            if (user is null)
                return Unauthorized();

            var log = _salaryRepository.GetWorkingLogById(id);
            if (log.Employee.Id != user.Employee.Id)
                return Unauthorized();

            _salaryRepository.RemoveAttendance(log);
            _unitOfWork.Save();

            return Ok();
        }
        #endregion

        #region EmployeeAttendance
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        [HttpGet(Name = "GetAttendance")]
        public ActionResult<IEnumerable<AttendanceDTO>> GetAttendance()
        {
            IEnumerable<WorkingLog> logs = _salaryRepository.GetAttendanceList();
            return logs.Select(e => new AttendanceDTO()
            {
                Id = e.Id,
                Date = e.Date,
                Duration = e.Duration,
                Note = e.Note,
                LogStatus = e.LogStatus,
                Employee = _mapper.Map<EmployeeDTO>(e.Employee)
            }).ToList();
        }

        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        [HttpGet("{id}", Name = "GetAttendanceById")]
        public ActionResult<AttendanceDTO> GetAttendanceById(int id)
        {
            WorkingLog e = _salaryRepository.GetAttendanceById(id);

            if (e is not null)
                return new AttendanceDTO()
                {
                    Id = e.Id,
                    Date = e.Date,
                    Duration = e.Duration,
                    Note = e.Note,
                    LogStatus = e.LogStatus,
                    Employee = _mapper.Map<EmployeeDTO>(e.Employee)
                };
            return NotFound();
        }
        [HttpPost("{id}/approve", Name = "ApproveAttendance")]
        [ApiConventionMethod(typeof(CustomApiConventions), nameof(CustomApiConventions.Perform))]
        public IActionResult ApproveAttendance(int id)
        {
            var log = _salaryRepository.GetWorkingLogById(id);
            if (log is null)
                return NotFound();
            _salaryRepository.ApproveLog(log);
            _unitOfWork.Save();
            return NoContent();
        }

        [HttpPost("{id}/reject", Name = "RejectAttendance")]
        [ApiConventionMethod(typeof(CustomApiConventions), nameof(CustomApiConventions.Perform))]
        public IActionResult RejectAttendance(int id)
        {
            var log = _salaryRepository.GetWorkingLogById(id);
            if (log is null)
                return NotFound();

            _salaryRepository.RejectLog(log);
            _unitOfWork.Save();
            return NoContent();
        }
        #endregion
    }
}
