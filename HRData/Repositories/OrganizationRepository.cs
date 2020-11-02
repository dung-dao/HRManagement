using HRData.Data;
using HRData.Models;
using HRData.Models.Organization;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

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
