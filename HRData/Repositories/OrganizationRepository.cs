using HRData.Data;
using HRData.Models.Organization;
using System.Collections.Generic;
using System.Linq;

namespace HRData.Repositories
{
    public interface IOrganizationRepository
    {
        List<OrganizationUnit> GetOrgTree();
    }

    public class OrganizationRepository : Repository, IOrganizationRepository
    {
        public OrganizationRepository(ApplicationDbContext context) : base(context)
        {
        }

        public List<OrganizationUnit> GetOrgTree()
        {
            return context.OrganizationUnits.ToList();
        }
    }
}
