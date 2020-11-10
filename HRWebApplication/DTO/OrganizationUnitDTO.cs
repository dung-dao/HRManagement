using HRData.Models;
using HRData.Models.Organization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.DTO
{
    public class OrganizationUnitDTO : NamedDTO
    {
        public int EmployeeNo { get; set; }
        public int? ParentId { get; set; }
    }
}
    