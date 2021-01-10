﻿using Helper.Exceptions;
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
    public class TimeOffController : ApiControllerBase
    {
        private readonly ISalaryRepository _salaryRepository;
        private readonly IUnitOfWork _unitOfWork;

        public TimeOffController(
            IUserRepository userRepository,
            ISalaryRepository salaryRepository,
            IUnitOfWork unitOfWork
        ) : base(userRepository)
        {
            _salaryRepository = salaryRepository;
            _unitOfWork = unitOfWork;
        }

        #region MyTimeOff
        [HttpGet("Me")]
        public ActionResult<IEnumerable<TimeOffDTO>> GetMyTimeOff()
        {
            var user = GetAuthorizedUser();
            if (user is null)
                return Unauthorized();

            IEnumerable<WorkingLog> logs = _salaryRepository.GetTimeOffList(user.Employee);

            return logs.Select(e => new TimeOffDTO()
            {
                Id = e.Id,
                Date = e.Date,
                Duration = e.Duration,
                Note = e.Note,
                TimeOffType = e.TimeOffType
            }).ToList();
        }

        [HttpGet("Me/{id}")]
        public ActionResult<TimeOffDTO> GetMyTimeOffById(int id)
        {
            var user = GetAuthorizedUser();
            if (user is null)
                return Unauthorized();

            WorkingLog log = _salaryRepository.GetTimeOffById(id);
            if (log.Employee.Id != user.Employee.Id)
                return Unauthorized();

            if (log is not null)
                return new TimeOffDTO()
                {
                    Id = log.Id,
                    Date = log.Date,
                    Duration = log.Duration,
                    Note = log.Note,
                    TimeOffType = log.TimeOffType
                };
            return NotFound();
        }

        [HttpPost("Me")]
        public ActionResult<TimeOffDTO> PostMyTimeOff([FromBody] TimeOffDTO data)
        {
            var user = GetAuthorizedUser();
            if (user is null)
                return Unauthorized();

            TimeOffType timeOffType = _salaryRepository.GetTimeOffTypeById(data.TimeOffType.Id);
            if (timeOffType is null)
                return NotFound();

            var newTimeOff = new WorkingLog()
            {
                Type = WorkingLogType.TimeOff,
                Date = data.Date,
                Duration = data.Duration,
                Note = data.Note,
                RecordStatus = RecordStatus.Active,
                TimeOffType = data.TimeOffType
            };

            try
            {
                _salaryRepository.CreateTimeOff(newTimeOff, user.Employee);
            }
            catch (ClientException)
            {
                return BadRequest();
                throw;
            }
            _unitOfWork.Save();

            return CreatedAtAction("GetMyTimeOffById", new { id = data.Id }, newTimeOff);
        }

        [HttpPut("Me/{id}")]
        public IActionResult UpdateTimeOffById(int id, TimeOffDTO data)
        {
            var user = GetAuthorizedUser();
            if (user is null)
                return Unauthorized();

            var updateTimeOff = new WorkingLog()
            {
                Type = WorkingLogType.TimeOff,
                Date = data.Date,
                Duration = data.Duration,
                Note = data.Note,
                RecordStatus = RecordStatus.Active,
                TimeOffType = data.TimeOffType
            };

            var log = _salaryRepository.GetWorkingLogById(id);
            if (log.Employee.Id != user.Employee.Id)
                return Unauthorized();
            _salaryRepository.UpdateMyTimeOff(log, updateTimeOff);
            _unitOfWork.Save();

            return NoContent();
        }
        #endregion

        #region EmployeeTimeOff
        [HttpGet]
        public ActionResult<IEnumerable<TimeOffDTO>> GetTimeOff()
        {
            IEnumerable<WorkingLog> logs = _salaryRepository.GetTimeOffList();
            return logs.Select(e => new TimeOffDTO()
            {
                Id = e.Id,
                Date = e.Date,
                Duration = e.Duration,
                Note = e.Note,
                TimeOffType = e.TimeOffType
            }).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<TimeOffDTO> GetTimeOffById(int id)
        {
            WorkingLog timeoff = _salaryRepository.GetTimeOffById(id);

            if (timeoff is not null)
                return new TimeOffDTO()
                {
                    Id = timeoff.Id,
                    Date = timeoff.Date,
                    Duration = timeoff.Duration,
                    Note = timeoff.Note,
                    TimeOffType = timeoff.TimeOffType
                };
            return NotFound();
        }

        // [HttpPost("{id}/approve")]
        // public IActionResult Approve(int id)
        // {
        //     _salaryRepository.ApproveLog(id);
        //     _unitOfWork.Save();
        //     return NoContent();
        // }

        // [HttpPost("{id}/reject")]
        // public IActionResult Reject(int id)
        // {
        //     _salaryRepository.RejectLog(id);
        //     _unitOfWork.Save();
        //     return NoContent();
        // }
        #endregion
    }
}
