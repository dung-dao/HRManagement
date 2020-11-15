using HRData.Models.JobModels;
using System;

namespace HRWebApplication.DTO
{
    public class PositionDTO
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Decimal Salery { get; set; }

        public JobTitleDTO JobTitle { get; set; }
        public EmploymentStatusDTO EmploymentStatus { get; set; }
        public JobCategoryDTO JobCategory { get; set; }
        public OrganizationUnitDTO Unit { get; set; }
    }
}
