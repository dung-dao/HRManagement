using HRData.Data;

namespace HRData.Repositories
{
    public class Repository
    {
        protected readonly ApplicationDbContext context;

        public Repository(ApplicationDbContext context)
        {
            this.context = context;
        }
    }
}
