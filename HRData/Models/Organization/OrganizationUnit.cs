using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using System.Collections.Generic;

namespace HRData.Models.Organization
{
    public class OrganizationUnit : NamedEntity
    {
        public int? ParentId { get; set; }
        #region Nav
        public virtual OrganizationUnit Parent { get; set; }
        //public virtual Branch Branch { get; set; }
        /// <summary>
        /// List các bộ phận con
        /// </summary>
        public virtual List<OrganizationUnit> Children { get; set; }
        /// <summary>
        /// Trưởng bộ phận
        /// </summary>
        //public Employee SectionManager => this.Employees.Find(e => e.IsManager);

        /// <summary>
        /// List nhân viên bộ phận, không bao gồm bộ phận con
        /// </summary>
        public virtual List<Employee> Employees { get; set; }
        #endregion
    }
}
