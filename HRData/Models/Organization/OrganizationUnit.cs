﻿using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using System.Collections.Generic;

namespace HRData.Models.Organization
{
    public class OrganizationUnit : NamedEntity
    {
        public int? ParentId { get; set; }
        #region Nav
        public virtual OrganizationUnit Parent { get; set; }
        public virtual List<OrganizationUnit> Children { get; set; }
        public virtual List<Employee> Employees { get; set; }
        #endregion
    }
}
