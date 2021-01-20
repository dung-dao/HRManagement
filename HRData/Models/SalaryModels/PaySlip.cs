using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Models.SalaryModels
{
    public enum PaySlipStatus
    {
        Temporary,
        Confirmed
    }
    public class PaySlip : EntityBase
    {
        public decimal Amount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public double Attendance { get; set; }
        public double PaidTimeOff { get; set; }
        public double HolidayTimeOff { get; set; }
        public double UnpaidTimeOff { get; set; }

        public PaySlipStatus Status { get; set; }
        public virtual Employee Employee { get; set; }

        public virtual PayRoll PayRoll { get; set; }
    }
}
