using HRData.Models.Organization;
using System;

namespace HRData.Models.JobModels
{
    public class Position : EntityBase
    {
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual JobTitle JobTitle { get; set; }
        public virtual JobCategory JobCategory { get; set; }
        public virtual EmploymentStatus EmploymentStatus { get; set; }
        public virtual OrganizationUnit Unit { get; set; }
        public DateTime StartDate { get; set; }
        public TimeSpan Duration { get; set; }
        public Decimal Salery { get; set; }
    }
}
