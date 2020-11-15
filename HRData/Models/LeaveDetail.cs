using HRData.Models.JobModels;
using System;

namespace HRData.Models
{
    public class LeaveDetail : EntityBase
    {
        public virtual Position Position { get; set; }
        public DateTime Date { get; set; }
        public string Reason { get; set; }
        public virtual LeaveType Type { get; set; }
    }
}