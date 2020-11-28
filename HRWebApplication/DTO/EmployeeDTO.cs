using HRData.Models;
using System;

namespace HRWebApplication.DTO
{
    public class EmployeeDTO : DTOBase
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
        public EmployeeStatus Status { get; set; }
    }
}
