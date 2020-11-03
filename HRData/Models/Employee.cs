using System;

namespace HRData.Models
{
    public class Employee : EntityBase
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PersonalEmail { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Sex { get; set; }

        public string IdCardNo { get; set; }
        public DateTime Issused { get; set; }
        public DateTime Date { get; set; }

        #region Education
        public string AcademicLevel { get; set; }
        public string University { get; set; }
        public string Major { get; set; }
        #endregion
    }
}
