using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Models.SalaryModels
{
    public enum AccrualFrequency
    {
        Monthly,
        Yearly
    }
    public class TimeOffType : EntityBase
    {
        public bool IsPaidTimeOff { get; set; }
        public int MyProperty { get; set; }
        public AccrualFrequency Frequency { get; set; }
        public double MaximumCarryOver { get; set; }

        public virtual List<WorkingLog> WorkingLogs { get; set; }
        public virtual List<LeaveEntitlement> LeaveEntitlements { get; set; }



        public virtual List<Employee> Employees { get; set; }
    }
}
