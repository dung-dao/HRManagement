using System.Collections.Generic;

namespace HRData.Models.Organization
{
    public class OrganizationUnit : NamedEntity
    {
        public string Status { get; set; }
        //public virtual Branch Branch { get; set; }
        public virtual List<OrganizationUnit> Children { get; set; }
    }
}
