using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Models
{
    public class OrganizationUnit : NamedEntity
    {
        [MaxLength(20)]
        public string Status { get; set; }
        public virtual Branch Branch { get; set; }
        //public virtual Department Parent { get; set; }
        public virtual List<OrganizationUnit> Children { get; set; }
    }
}
