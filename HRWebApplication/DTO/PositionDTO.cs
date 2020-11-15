using HRData.Models.JobModels;
using System;

namespace HRWebApplication.DTO
{
    public class PositionDTO
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Decimal Salery { get; set; }

        public JobTitle JobTitle { get; set; }
        public EmploymentStatus EmploymentStatus { get; set; }
        public JobCategory JobCategory { get; set; }
        public OrganizationUnitDTO Unit { get; set; }
    }
}
