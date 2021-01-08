using HRData.Models.Organization;
using System;
using System.Collections.Generic;

namespace HRData.Models.JobModels
{
    public class Position : EntityBase
    {
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        //public Decimal Allowance { get; set; }
        public Decimal Salary { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual JobTitle JobTitle { get; set; }
        public virtual WorkType WorkType { get; set; }
        public virtual OrganizationUnit Unit { get; set; }

        #region LeaveDetail
        public DateTime? LeaveDate { get; set; }
        
        #nullable enable
        public string? LeaveReason { get; set; }
        #nullable disable

        //public virtual LeaveType LeaveType { get; set; }
        #endregion
    }
}
