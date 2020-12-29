using AutoMapper;
using HRData.Models;
using HRData.Repositories;
using HRWebApplication.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers
{
    public class LeaveDetailsController : ApiControllerBase
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
        [Authorize]
        public IEnumerable<LeaveDetailDTO> GetActiveLeaves()
        {
            var canManage = (User.Claims.FirstOrDefault(e =>
            {
                return e.Type == ClaimTypes.Role
                && (e.Value == "Admin" || e.Value == "Manager");
            }) is null) ? false : true;

            List<LeaveDetail> details;
            if (canManage)
                details = _timeSheetRepository.GetLeaves();
            else
            {
                var user = _userRepository.GetById(GetUserId());

                details = _timeSheetRepository.GetLeaves(user.Employee);
            }
            return _mapper.Map<List<LeaveDetailDTO>>(details);
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpGet("all")]
        public IEnumerable<LeaveDetailDTO> GetLeaves()
        {
            var leaves = _timeSheetRepository.GetLeaves();
            return _mapper.Map<List<LeaveDetailDTO>>(leaves);
        }

        [Authorize]
        [HttpPost("RequestLeave")]
        public IActionResult RequestLeave(LeaveDetailDTO detail)
        {
            var user = _userRepository.GetById(GetUserId());

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
            _unitOfWork.Save();
            return NoContent();
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpPost("ApproveLeave")]
        public IActionResult ApproveLeave(LeaveDetailDTO detail)
        {
            var user = _userRepository.GetById(GetUserId());

            var employee = user.Employee;
            if (employee is null)
                return BadRequest();

            var leave = _timeSheetRepository.GetLeaveDetailById(detail.Id);

            _timeSheetRepository.ApproveLeave(leave, employee);

            _unitOfWork.Save();
            return NoContent();
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpPost("RejectLeave")]
        public IActionResult RejectLeave(LeaveDetailDTO detail)
        {
            var user = _userRepository.GetById(GetUserId());

            var employee = user.Employee;
            if (employee is null)
                return BadRequest();

            var leave = _timeSheetRepository.GetLeaveDetailById(detail.Id);

            _timeSheetRepository.RejectLeave(leave, employee);

            _unitOfWork.Save();
            return NoContent();
        }
    }
}
