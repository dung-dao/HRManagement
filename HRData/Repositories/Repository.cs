using HRData.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Repositories
{
    public class Repository<T> where T: EntityBase
    {
        protected readonly ApplicationDbContext context;
        protected readonly DbSet<T> table;

        public Repository(ApplicationDbContext context)
        {
            this.context = context;
            this.table = context.Set<T>();
        }
    }
}
