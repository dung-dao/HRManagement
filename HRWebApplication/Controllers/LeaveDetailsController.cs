using AutoMapper;
using HRData.Models;
using HRData.Repositories;
using HRWebApplication.DTO;
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
    public class LeaveDetailsController : ControllerBase
    {
        private readonly ITimeSheetRepository _timeSheetRepository;
        private readonly IEmployeeRepostiory _employeeRepostiory;
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public LeaveDetailsController(
            ITimeSheetRepository timeSheetRepository,
            IEmployeeRepostiory employeeRepostiory,
            IUserRepository userRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper
            )
        {
            _timeSheetRepository = timeSheetRepository;
            _employeeRepostiory = employeeRepostiory;
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            
        }
        [HttpGet]
        public IEnumerable<LeaveDetailDTO> GetActiveLeaves()
        {
            var leaves = _timeSheetRepository.GetActiveLeaves();
            return _mapper.Map<List<LeaveDetailDTO>>(leaves);
        }

        [HttpGet("all")]
        public IEnumerable<LeaveDetailDTO> GetLeaves()
        {
            var leaves = _timeSheetRepository.GetLeaves();
            return _mapper.Map<List<LeaveDetailDTO>>(leaves);
        }

        [HttpPost("RequestLeave")]
        public IActionResult RequestLeave(LeaveDetailDTO detail)
        {
            var userId = User.Claims.First(e => e.Type == "UserId").Value;

            var user = _userRepository.GetById(userId);

            var employee = user.Employee;
            if (employee is null)
                return BadRequest();

            var type = _timeSheetRepository.GetLeaveTypeById(detail.LeaveType.Id);


            var leave = new LeaveDetail()
            {
                Date = detail.Date,
                LeaveType = type,
            };

            _timeSheetRepository.RequestLeave(leave, employee);
            _unitOfWork.Commit();
            return NoContent();
        }

        [HttpPost("ApproveLeave")]
        public IActionResult ApproveLeave(LeaveDetailDTO detail)
        {
            var userId = User.Claims.First(e => e.Type == "UserId").Value;

            var user = _userRepository.GetById(userId);

            var employee = user.Employee;
            if (employee is null)
                return BadRequest();

            var leave = _timeSheetRepository.GetLeaveDetailById(detail.Id);

            _timeSheetRepository.ApproveLeave(leave, employee);

            _unitOfWork.Commit();
            return NoContent();
        }

        [HttpPost("RejectLeave")]
        public IActionResult RejectLeave(LeaveDetailDTO detail)
        {
            var userId = User.Claims.First(e => e.Type == "UserId").Value;

            var user = _userRepository.GetById(userId);

            var employee = user.Employee;
            if (employee is null)
                return BadRequest();

            var leave = _timeSheetRepository.GetLeaveDetailById(detail.Id);

            _timeSheetRepository.RejectLeave(leave, employee);

            _unitOfWork.Commit();
            return NoContent();
        }
    }
}
