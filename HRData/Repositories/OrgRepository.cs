using HRData.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Repositories
{
    public interface IOrgRepository
    {
        void CreateDepartment(Department department);
        void SetBranch(Branch branch);
    }

    public class OrgRepository : Repository<WorkPlace>, IOrgRepository
    {
        public OrgRepository(ApplicationDbContext context) : base(context)
        {
        }

        public void CreateDepartment(Department department)
        {
            throw new NotImplementedException();
        }

        public void SetBranch(Branch branch)
        {
            throw new NotImplementedException();
        }
    }
}
