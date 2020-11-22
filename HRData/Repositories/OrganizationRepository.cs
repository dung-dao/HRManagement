﻿using HRData.Data;
using HRData.Models.Organization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Repositories
{
    public interface IOrganizationRepository : IRepository<OrganizationUnit>
    {
        int CountEmployee(OrganizationUnit unit);
        void AddSubUnit(OrganizationUnit parent, OrganizationUnit child);
        bool ChangeParentUnit(OrganizationUnit unit, OrganizationUnit parent);
    }
    public class OrganizationRepository : Repository<OrganizationUnit>, IOrganizationRepository
    {
        public OrganizationRepository(ApplicationDbContext context) : base(context)
        {
        }

        public void AddSubUnit(OrganizationUnit parent, OrganizationUnit child)
        {
            parent.Children.Add(child);
        }

        public bool ChangeParentUnit(OrganizationUnit unit, OrganizationUnit parent)
        {
            if (ExistsInTree(parent, unit))
                return false;

            parent.Children.Add(unit);
            return true;
        }

        private bool ExistsInTree(OrganizationUnit tree, OrganizationUnit unit)
        {
            if (tree.Children.Count > 0)
            {
                foreach (var subTree in tree.Children)
                {
                    if (ExistsInTree(subTree, unit))
                        return true;
                }
            }

            return (tree.Id == unit.Id);
        }

        public override void Delete(OrganizationUnit unit)
        {
            if (unit.Children.Count > 0)
            {
                foreach (var child in unit.Children)
                {
                    Delete(child);
                }
            }

            unit.RecordStatus = Models.RecordStatus.InActive;
        }

        public int CountEmployee(OrganizationUnit unit)
        {
            return (from p in unit.Positions
                    where p.StartDate < DateTime.Now && p.LeaveDetail is null
                    select p).Count();
        }
    }
}
