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
        public string Name { get; set; }
        public bool IsPaidTimeOff { get; set; }
        public string Description { get; set; }
        // public AccrualFrequency Frequency { get; set; }
        // public double MaximumCarryOver { get; set; }
        // public double InitialValue { get; set; }

        //nav
        public virtual List<WorkingLog> WorkingLogs { get; set; }
    }
}
