using HRData.Models.JobModels;
using HRData.Models.SalaryModels;
using System;
using System.Collections.Generic;

namespace HRData.Models
{
    public enum EmployeeStatus
    {
        Pending,
        Working,
        Leaved
    }
    public class Employee : EntityBase
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PersonalEmail { get; set; }
        public string WorkEmail { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Sex { get; set; }

        public string Address { get; set; }
        public string CurrentAddress { get; set; }

        public string NationalId { get; set; }
        public string UserId { get; set; }

        public virtual List<Position> Positions { get; set; }
        public virtual User User { get; set; }
        public virtual List<WorkingLog> WorkingLogs { get; set; }
        public virtual List<LeaveEntitlement> LeaveEntitlements { get; set; }
        public virtual List<SalaryPayment> SalaryPayments { get; set; }


        public virtual List<TimeOffType> TimeOffTypes { get; set; }
    }
}
