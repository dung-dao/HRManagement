using HRData.Data;

namespace HRData.Repositories
{
    public abstract class Repository
    {
        protected readonly ApplicationDbContext context;

        public Repository(ApplicationDbContext context)
        {
            this.context = context;
        }
    }
}
