using HRData.Models.Organization;
using System;

namespace HRData.Models.JobModels
{
    public class Position : EntityBase
    {
        public Employee Employee { get; set; }
        public JobTitle JobTitle { get; set; }
        public JobCategory JobCategory { get; set; }
        public OrganizationUnit Unit { get; set; }
        public DateTime StartDate { get; set; }
        public TimeSpan Duration { get; set; }
    }
}
