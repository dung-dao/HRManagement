using System;

namespace HRWebApplication.DTO.Salary
{
    public class PaySlipDTO : DTOBase
    {
        public decimal Amount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public HRData.Models.SalaryModels.PaySlipStatus Status { get; set; }
        public EmployeeDTO Employee { get; set; }
    }
}