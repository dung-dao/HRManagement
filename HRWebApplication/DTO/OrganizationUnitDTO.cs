using HRData.Models;
using HRData.Models.Organization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.DTO
{
    public class OrganizationUnitDTO : NamedEntity
    {
        public string Status { get; set; }
        //public virtual Branch Branch { get; set; }
        public virtual List<OrganizationUnit> Children { get; set; }
        public Employee SectionManager;
        public virtual List<Employee> Employees { get; set; }
        public int EmployeeNo { get; set; }
    }
}
