using HRData.Models.Organization;
using System;

namespace HRData.Models.JobModels
{
    public class Position : EntityBase
    {
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Decimal Salery { get; set; }

        #region Navigation
        public virtual Employee Employee { get; set; }
        public virtual JobTitle JobTitle { get; set; }
        public virtual EmploymentStatus EmploymentStatus { get; set; }
        public virtual JobCategory JobCategory { get; set; }
        public virtual OrganizationUnit Unit { get; set; }

        public int LeaveDetailId { get; set; }
        public virtual LeaveDetail LeaveDetail { get; set; }
        #endregion
    }
}
