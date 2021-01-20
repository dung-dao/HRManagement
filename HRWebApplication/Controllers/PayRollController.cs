using AutoMapper;
using HRData.Models.SalaryModels;
using HRData.Repositories;
using HRWebApplication.DTO.Salary;
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
    public class PayRollController : ApiControllerBase
    {
        private readonly ISalaryRepository _salaryRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public PayRollController(
            ISalaryRepository salaryRepository,
            IUserRepository userRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork
            ) : base(userRepository)
        {
            _salaryRepository = salaryRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        //Mine
        [HttpGet("Me/Payslips", Name = "GetMyPayslips")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public ActionResult<IEnumerable<PaySlipDTO>> GetMyPayslips()
        {
            var user = GetAuthorizedUser();
            List<PaySlip> payslips = _salaryRepository.GetPaySlips(user.Employee);
            return _mapper.Map<List<PaySlipDTO>>(payslips);
        }

        //Employees
        [HttpGet(Name = "GetAllPayrolls")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public ActionResult<IEnumerable<PayRollDTO>> GetAll()
        {
            List<PayRoll> payRolls = _salaryRepository.GetPayRoll();
            return _mapper.Map<List<PayRollDTO>>(payRolls);
        }

        [HttpGet("{id}", Name = "GetPayrollById")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public ActionResult<PayRollDTO> GetById(int id)
        {
            PayRoll payRoll = _salaryRepository.GetPayRoll(id);
            if (payRoll is null)
                return NotFound();
            return _mapper.Map<PayRollDTO>(payRoll);
        }

        [HttpGet("{id}/PaySlips", Name = "GetPaySlips")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public ActionResult<IEnumerable<PaySlipDTO>> GetPaySlips(int id)
        {
            PayRoll payroll = _salaryRepository.GetPayRoll(id);
            if (payroll is null)
                return NotFound();

            List<PaySlip> payslips = _salaryRepository.GetPaySlips(payroll);
            return _mapper.Map<List<PaySlipDTO>>(payslips);
        }

        [HttpPost(Name = "CreatePayroll")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Post))]
        public ActionResult<PayRollDTO> CreatePayroll([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var user = GetAuthorizedUser();
            var payroll = _salaryRepository.CreatePayroll(startDate, endDate, user.Employee);
            _unitOfWork.Save();

            return CreatedAtAction("GetById", new { id = payroll.Id }, _mapper.Map<PayRollDTO>(payroll));
        }

        [HttpDelete("{id}", Name = "DeletePayroll")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Delete))]
        public IActionResult Delete(int id)
        {
            var payroll = _salaryRepository.GetPayRoll(id);
            if (payroll is null)
                return NotFound();

            _salaryRepository.DeletePayroll(payroll);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpPut("{id}", Name = "ConfirmPayroll")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
        public IActionResult Confirm(int id)
        {
            PayRoll payroll = _salaryRepository.GetPayRoll(id);
            _salaryRepository.ConfirmPayroll(payroll);
            _unitOfWork.Save();
            return NoContent();
        }
    }
}
