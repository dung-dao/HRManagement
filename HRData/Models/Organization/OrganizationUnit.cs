using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using System.Collections.Generic;

namespace HRData.Models.Organization
{
    public class OrganizationUnit : NamedEntity
    {
        public string Status { get; set; }
        //public virtual Branch Branch { get; set; }
        public virtual List<OrganizationUnit> Children { get; set; }
        public Employee SectionManager => this.Employees.Find(e => e.IsManager);
        public virtual List<Employee> Employees { get; set; }
    }
}
