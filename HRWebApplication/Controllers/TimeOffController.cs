using AutoMapper;
using Helper.Exceptions;
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
    public class TimeOffController : ApiControllerBase
    {
        private readonly ISalaryRepository _salaryRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IEmployeeRepostiory _employeeRepostiory;

        public TimeOffController(
            IUserRepository userRepository,
            IEmployeeRepostiory employeeRepostiory,
            ISalaryRepository salaryRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper
        ) : base(userRepository)
        {
            _salaryRepository = salaryRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _employeeRepostiory = employeeRepostiory;
        }

        #region MyTimeOff
        [HttpGet("Me", Name = "GetAllMine")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
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
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
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
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Post))]
        public ActionResult<TimeOffDTO> PostMyTimeOff([FromBody] TimeOffDTO data)
        {
            var user = GetAuthorizedUser();
            if (user is null)
                return Unauthorized();

            TimeOffType timeOffType = _salaryRepository.GetTimeOffTypeById(data.TimeOffType.Id);
            if (timeOffType is null)
                return NotFound();

            var log = new WorkingLog()
            {
                Type = WorkingLogType.TimeOff,
                Date = data.Date,
                Duration = data.Duration,
                Note = data.Note,
                RecordStatus = RecordStatus.Active,
                TimeOffType = timeOffType
            };

            _salaryRepository.CreateTimeOff(log, user.Employee);
            _unitOfWork.Save();
            var res = new TimeOffDTO()
            {
                Id = log.Id,
                Date = log.Date,
                Duration = log.Duration,
                Note = log.Note,
                TimeOffType = _mapper.Map<TimeOffTypeDTO>(log.TimeOffType),
                LogStatus = log.LogStatus
            }; ;

            return CreatedAtAction("GetMyTimeOffById", new { id = res.Id }, res);
        }

        [HttpPut("Me/{id}", Name = "EditMineById")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
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

        [HttpDelete("Me/{id}", Name = "DeleteMyTimeOffById")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Delete))]
        public IActionResult DeleteMyTimeOffById(int id)
        {
            var user = GetAuthorizedUser();
            if (user is null)
                return Unauthorized();

            var log = _salaryRepository.GetWorkingLogById(id);
            if (log.Employee.Id != user.Employee.Id)
                return Unauthorized();

            _salaryRepository.RemoveMyTimeOff(log);
            return NoContent();
        }
        #endregion

        #region EmployeeTimeOff
        [HttpGet(Name = "GetAll")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
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
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
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
        [ApiConventionMethod(typeof(CustomApiConventions), nameof(CustomApiConventions.Perform))]
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
        [ApiConventionMethod(typeof(CustomApiConventions), nameof(CustomApiConventions.Perform))]
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
