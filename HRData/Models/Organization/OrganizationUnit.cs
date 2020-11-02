using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Models.Organization
{
    public class OrganizationUnit : NamedEntity
    {
        public string Status { get; set; }
        //public virtual Branch Branch { get; set; }
        public virtual List<OrganizationUnit> Children { get; set; }
    }
}
