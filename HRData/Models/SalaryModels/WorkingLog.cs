using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Models.SalaryModels
{
    public enum WorkingLogType
    {
        Attendance = 1,
        TimeOff = 2
    }
    public class WorkingLog : EntityBase
    {
        public WorkingLogType Type { get; set; }
        public DateTime Date { get; set; }
        public double Duration { get; set; }
        public string Note { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual TimeOffType TimeOffType { get; set; }
    }
}
