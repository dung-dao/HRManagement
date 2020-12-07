using HRData.Models.Organization;
using System;

namespace HRData.Models.JobModels
{
    public class Position : EntityBase
    {
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Decimal Salary { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual JobTitle JobTitle { get; set; }
        public virtual WorkType WorkType { get; set; }
        public virtual OrganizationUnit Unit { get; set; }

        #region LeaveDetail
        public DateTime? LeaveDate { get; set; }
        public string? LeaveReason { get; set; }

        public virtual LeaveType LeaveType { get; set; }
        #endregion
    }
}
