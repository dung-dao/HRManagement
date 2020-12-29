using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Models
{
    public static class LeaveStatuses
    {
        public const string Pending = "PENDING";
        public const string Approved = "APPROVED";
        public const string Rejected = "REJECTED";
    }
    public class LeaveDetail : EntityBase
    {
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public int EmployeeId { get; set; }
        public int? ReviewerId { get; set; }
        public virtual LeaveType LeaveType { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual Employee Reviewer { get; set; }
    }
}
