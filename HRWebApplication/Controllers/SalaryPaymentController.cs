using System;
using HRData.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace HRWebApplication.Controllers
{
    public class SalaryPaymentController : ApiControllerBase
    {
        private readonly ISalaryRepository _salaryRepository;
        private readonly IEmployeeRepostiory _employeeRepostiory;
        private readonly IUnitOfWork _unitOfWork;

        public SalaryPaymentController(
            IUserRepository userRepository,
            ISalaryRepository salaryRepository,
            IEmployeeRepostiory employeeRepostiory,
            IUnitOfWork unitOfWork
            ) : base(userRepository)
        {
            _salaryRepository = salaryRepository;
            _employeeRepostiory = employeeRepostiory;
            _unitOfWork = unitOfWork;
        }

        //[HttpPost("Generate")]
        //IActionResult GenerateSalaryPayment([FromForm] int employeeId, [FromForm] DateTime period)
        //{
        //    var employee = _employeeRepostiory.GetById(employeeId);
        //    if (employee is null)
        //        return NotFound();

        //    _salaryRepository.GenerateSalaryPayment(employee, period);
        //    _unitOfWork.Save();
        //    return NoContent();
        //}

        //[HttpPost("Confirm")]
        //IActionResult ConfirmSalaryPayment([FromQuery] int paymentId)
        //{
        //    var payment = _salaryRepository.GetSalaryPaymentById(paymentId);
        //    if (payment is null)
        //        return NotFound();
        //    _salaryRepository.ConfirmSalaryPayment(payment);
        //    _unitOfWork.Save();
        //    return NoContent();
        //}
    }
}