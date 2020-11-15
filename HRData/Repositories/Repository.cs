using HRData.Data;
using HRData.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace HRData.Repositories
{
    public interface IRepository<T> where T : EntityBase
    {
        List<T> GetActiveRecords();
        List<T> GetInactiveRecords();
        T GetById(int id);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
    }

    public abstract class Repository
    {
        protected readonly ApplicationDbContext _context;

        public Repository(ApplicationDbContext context)
        {
            this._context = context;
        }
    }

    public class Repository<T> : Repository, IRepository<T> where T : EntityBase
    {
        protected readonly DbSet<T> entities;
        public Repository(ApplicationDbContext context) : base(context)
        {
            this.entities = context.Set<T>();
        }
        public virtual T GetById(int id) => entities.Find(id);
        public virtual List<T> GetActiveRecords() => (from e in entities
                                              where e.RecordStatus == RecordStatus.Active
                                              select e).ToList();
        public virtual List<T> GetInactiveRecords() => (from e in entities
                                                where e.RecordStatus == RecordStatus.InActive
                                                select e).ToList();
        public virtual void Add(T entity)
        {
            entity.RecordStatus = RecordStatus.Active;
            entities.Add(entity);
        }

        public virtual void Delete(T entity)
        {
            entity.RecordStatus = RecordStatus.InActive;
        }

        public virtual void Exists(int id) => entities.Any(e => e.Id == id);

        public virtual void Update(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            _context.Entry(entity).Property(e => e.RecordStatus).IsModified = false;
        }
    }
}
