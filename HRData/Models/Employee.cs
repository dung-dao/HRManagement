using HRData.Models.JobModels;
using HRData.Models.Organization;
using System;
using System.Collections.Generic;

namespace HRData.Models
{
    public class Employee : EntityBase
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PersonalEmail { get; set; }
        public string WorkEmail { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Sex { get; set; }

        public string Address { get; set; }
        public string CurrentAddress { get; set; }

        public string NationalId { get; set; }

        public bool IsManager { get; set; }

        #region Education
        public string AcademicLevel { get; set; }
        public string University { get; set; }
        public string Major { get; set; }
        #endregion
        #region Navigation
        public virtual List<Position> Positions { get; set; }
        public virtual OrganizationUnit Unit { get; set; }
        #endregion
    }
}
