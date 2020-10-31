using HRData.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace HRData.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions) { }
        
        //Organization
        public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
        //public DbSet<Branch> Branches { get; set; }

        //Employee
        //public DbSet<WorkType> WorkTypes { get; set; }
        //public DbSet<EmployeeType> EmployeeTypes { get; set; }
        //public DbSet<JobCategory> JobCategories { get; set; }
        //public DbSet<Position> Positions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //Use preconfigured api config
            base.OnModelCreating(builder);

            builder.Entity<OrganizationUnit>(entity =>
            {
                //Properties
                entity.HasKey(e => e.Id);

                //Relationship
                entity
                .HasMany(e => e.Children);
            });
        }
    }
}
