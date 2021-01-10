using System;
namespace HRData.Models.SalaryModels
{
    public class LeaveEntitlement : EntityBase
    {
        public double Balance { get; set; }
        public DateTime LastInit { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual TimeOffType TimeOffType { get; set; }
    }
}