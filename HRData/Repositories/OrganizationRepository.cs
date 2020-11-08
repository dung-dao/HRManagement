using HRData.Data;
using HRData.Models;
using HRData.Models.Organization;
using System.Collections.Generic;
using System.Linq;

namespace HRData.Repositories
{
    public interface IOrganizationRepository
    {
        List<OrganizationUnit> GetOrgTree();
        int GetEmployeeNumber(int Id);
    }

    public class OrganizationRepository : Repository, IOrganizationRepository
    {
        public OrganizationRepository(ApplicationDbContext context) : base(context)
        {
        }

        public int GetEmployeeNumber(int Id)
        {
            var unit = context.OrganizationUnits.Find(Id);
            if (unit is null)
                return 0;

            return RecursiveCountEmp(unit);
            int RecursiveCountEmp(OrganizationUnit unit)
            {
                int empNo = unit.Employees.Count;
                if (unit.Children.Count == 0)
                    return empNo;

                foreach (var child in unit.Children)
                {
                    empNo += RecursiveCountEmp(child);
                }
                return empNo;
            }
        }

        public List<OrganizationUnit> GetOrgTree()
        {
            return context.OrganizationUnits.ToList();
        }
    }
}
