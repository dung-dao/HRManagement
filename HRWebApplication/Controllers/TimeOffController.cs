using AutoMapper;
using Helper.Exceptions;
using HRData.Models;
using HRData.Models.SalaryModels;
using HRData.Repositories;
using HRWebApplication.DTO;
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
        private readonly IMapper _mapper;

        public TimeOffController(
            IUserRepository userRepository,
            ISalaryRepository salaryRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper
        ) : base(userRepository)
        {
            _salaryRepository = salaryRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        #region MyTimeOff
        [HttpGet("Me", Name = "GetAllMine")]
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
                TimeOffType = _mapper.Map<TimeOffTypeDTO>(e.TimeOffType),
                LogStatus = e.LogStatus
            }).ToList();
        }

        [HttpGet("Me/{id}", Name = "GetMineById")]
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
                    TimeOffType = _mapper.Map<TimeOffTypeDTO>(log.TimeOffType),
                    LogStatus = log.LogStatus
                };
            return NotFound();
        }

        [HttpPost("Me", Name = "CreateForMe")]
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
                TimeOffType = timeOffType
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

        [HttpPut("Me/{id}", Name = "EditMineById")]
        public IActionResult UpdateTimeOffById(int id, TimeOffDTO data)
        {
            var user = GetAuthorizedUser();
            if (user is null)
                return Unauthorized();

            TimeOffType timeOffType = _salaryRepository.GetTimeOffTypeById(data.TimeOffType.Id);
            if (timeOffType is null)
                return NotFound();

            var updateTimeOff = new WorkingLog()
            {
                Type = WorkingLogType.TimeOff,
                Date = data.Date,
                Duration = data.Duration,
                Note = data.Note,
                RecordStatus = RecordStatus.Active,
                TimeOffType = timeOffType
            };

            var log = _salaryRepository.GetWorkingLogById(id);
            if (log.Employee.Id != user.Employee.Id)
                return Unauthorized();

            if (log.LogStatus != LogStatus.Pending)
                return Forbid();

            _salaryRepository.UpdateMyTimeOff(log, updateTimeOff);
            _unitOfWork.Save();

            return NoContent();
        }
        #endregion

        #region EmployeeTimeOff
        [HttpGet(Name = "GetAll")]
        public ActionResult<IEnumerable<TimeOffDTO>> GetTimeOff()
        {
            IEnumerable<WorkingLog> logs = _salaryRepository.GetTimeOffList();
            return logs.Select(e => new TimeOffDTO()
            {
                Id = e.Id,
                Date = e.Date,
                Duration = e.Duration,
                Note = e.Note,
                TimeOffType = _mapper.Map<TimeOffTypeDTO>(e.TimeOffType),
                LogStatus = e.LogStatus,
                Employee = _mapper.Map<EmployeeDTO>(e.Employee)
            }).ToList();
        }

        [HttpGet("{id}", Name = "GetById")]
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
                    TimeOffType = _mapper.Map<TimeOffTypeDTO>(timeoff.TimeOffType),
                    LogStatus = timeoff.LogStatus,
                    Employee = _mapper.Map<EmployeeDTO>(timeoff.Employee)
                };
            return NotFound();
        }

        [HttpPost("{id}/approve", Name = "ApproveById")]
        public IActionResult Approve(int id)
        {
            var wl = _salaryRepository.GetWorkingLogById(id);
            if (wl is null)
                return NotFound();

            _salaryRepository.ApproveLog(wl);
            _unitOfWork.Save();
            return NoContent();
        }

        [HttpPost("{id}/reject", Name = "RejectById")]
        public IActionResult Reject(int id)
        {
            var wl = _salaryRepository.GetWorkingLogById(id);
            if (wl is null)
                return NotFound();

            _salaryRepository.RejectLog(wl);
            _unitOfWork.Save();
            return NoContent();
        }
        #endregion
    }
}
