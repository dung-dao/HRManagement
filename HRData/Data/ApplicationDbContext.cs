using HRData.Models;
using HRData.Models.JobModels;
using HRData.Models.Organization;
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

        #region Employee
        //public DbSet<JobTitle> JobTitles { get; set; }
        //public DbSet<JobCategory> JobCategories { get; set; }
        //public DbSet<EmploymentStatus> EmploymentStatuses { get; set; }
        public DbSet<Employee> Employees { get; set; }
        #endregion

        public DbSet<TestModel> TestModels { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //Use preconfigured api config
            base.OnModelCreating(builder);

            #region Organization
            builder.Entity<OrganizationUnit>(entity =>
            {
                //Properties
                entity.HasKey(e => e.Id);

                //Relationship
                entity.HasMany(e => e.Children);
            });

            //builder.Entity<Branch>(entity =>
            //{
            //    entity.HasKey(e => e.Id);
            //    entity.HasMany(e => e.Organization).WithOne(e => e.Branch);
            //});
            #endregion

            #region Employee
            //builder.Entity<JobTitle>(entity =>
            //{
            //    entity.HasKey(e => e.Id);
            //});

            //builder.Entity<JobCategory>(entity =>
            //{
            //    entity.HasKey(e => e.Id);
            //});

            //builder.Entity<EmploymentStatus>(entity =>
            //{
            //    entity.HasKey(e => e.Id);
            //});

            builder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Id);
            });
            #endregion
        }
    }
}
