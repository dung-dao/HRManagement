using HRData.Models;

namespace HRWebApplication.DTO
{
    public class OrganizationUnitDTO : NamedDTO
    {
        public int EmployeeNo { get; set; }
        public int? ParentId { get; set; }
    }
}
    