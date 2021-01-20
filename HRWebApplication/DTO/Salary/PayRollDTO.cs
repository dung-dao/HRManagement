using System;
using System.Collections.Generic;

namespace HRWebApplication.DTO.Salary
{
    public class PayRollDTO : DTOBase
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public int EmployeeNo { get; set; }
        public decimal Amount { get; set; }
        public HRData.Models.SalaryModels.PayRollStatus Status { get; set; }
        public EmployeeDTO Author { get; set; }
    }
}