using HRData.Data;
using HRData.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace HRData.Repositories
{
    public abstract class Repository
    {
        protected readonly ApplicationDbContext _context;

        public Repository(ApplicationDbContext context)
        {
            this._context = context;
        }
    }

    public class Repository<T> : Repository where T : EntityBase
    {
        protected readonly DbSet<T> entities;
        public Repository(ApplicationDbContext context) : base(context)
        {
            this.entities = context.Set<T>();
        }

        public void Exists(int id) => entities.Any(e => e.Id == id);
    }
}
