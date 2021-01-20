using System;
using System.Collections.Generic;

namespace HRData.Models.SalaryModels
{
    public enum PayRollStatus
    {
        Pending,
        Confirmed
    }
    public class PayRoll : EntityBase
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public int EmployeeNo { get; set; }
        public decimal Amount { get; set; }
        public PayRollStatus Status { get; set; }
        public virtual Employee Author { get; set; }
        public virtual List<PaySlip> PaySlips { get; set; }
    }
}