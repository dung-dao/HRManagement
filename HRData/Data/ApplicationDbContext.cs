using HRData.Models;
using HRData.Models.JobModels;
using HRData.Models.Organization;
using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Net.NetworkInformation;

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
        public DbSet<JobTitle> JobTitles { get; set; }
        public DbSet<JobCategory> JobCategories { get; set; }
        public DbSet<EmploymentStatus> EmploymentStatuses { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Position> Positions { get; set; }
        #endregion

        public DbSet<TestModel> TestModels { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //Use preconfigured api config
            base.OnModelCreating(builder);

            #region PrimaryKeyReg
            builder.Entity<OrganizationUnit>().HasKey(e => e.Id);
            builder.Entity<JobTitle>().HasKey(e => e.Id);
            builder.Entity<JobCategory>().HasKey(e => e.Id);
            builder.Entity<EmploymentStatus>().HasKey(e => e.Id);
            builder.Entity<OrganizationUnit>().HasKey(e => e.Id);
            builder.Entity<Employee>().HasKey(e => e.Id);
            builder.Entity<Position>().HasKey(e => e.Id);
            builder.Entity<OrganizationUnit>().HasKey(e => e.Id);

            #endregion

            #region Organization
            builder.Entity<OrganizationUnit>()
                .HasMany(e => e.Children).WithOne(e => e.Parent)
                .HasForeignKey(e => e.ParentId)
                .OnDelete(DeleteBehavior.NoAction);
            #endregion

            #region Employee
            builder.Entity<Employee>().HasMany(e => e.Positions).WithOne(p => p.Employee).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Position>().HasOne(p => p.JobTitle);
            builder.Entity<Position>().HasOne(p => p.EmploymentStatus);
            builder.Entity<Position>().HasOne(p => p.JobCategory);
            builder.Entity<Position>().HasOne(p => p.Unit);

            builder.Entity<Position>().Property(e => e.StartDate).IsRequired();
            builder.Entity<Position>(po => {
                po.Property(e => e.Salery).IsRequired();
                po.Property(e => e.Salery).HasColumnType("decimal(18, 6)");
            });
            #endregion
        }
    }
}
