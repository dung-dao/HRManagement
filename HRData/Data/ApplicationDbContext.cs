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

        #region DbSet
        public DbSet<OrganizationUnit> OrganizationUnits { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<JobTitle> JobTitles { get; set; }
        public DbSet<JobCategory> JobCategories { get; set; }
        public DbSet<WorkType> WorkType { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<LeaveDetail> LeaveDetails { get; set; }
        public DbSet<LeaveType> LeaveTypes { get; set; }

        //public DbSet<TimeSheet> TimeSheets { get; set; }
        #endregion

        public DbSet<TestModel> TestModels { get; set; }

        private void RegisterEntity<T>(ModelBuilder builder) where T : EntityBase
        {
            builder.Entity<T>().HasKey(e => e.Id);
            builder.Entity<T>().Property(e => e.RecordStatus).HasConversion<int>();
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            //Use preconfigured api config
            base.OnModelCreating(builder);

            #region KeyAndProperty
            RegisterEntity<OrganizationUnit>(builder);
            RegisterEntity<JobTitle>(builder);
            RegisterEntity<JobCategory>(builder);
            RegisterEntity<OrganizationUnit>(builder);

            RegisterEntity<WorkType>(builder);
            //builder.Entity<WorkType>().ToTable("WorkType");

            RegisterEntity<Employee>(builder);
            RegisterEntity<Position>(builder);
            RegisterEntity<LeaveDetail>(builder);
            RegisterEntity<LeaveType>(builder);

            #endregion

            #region Organization

            builder.Entity<OrganizationUnit>()
                .HasMany(e => e.Children).WithOne(e => e.Parent)
                .HasForeignKey(e => e.ParentId)
                .OnDelete(DeleteBehavior.NoAction);
            #endregion

            #region Employee
            builder.Entity<Employee>().Property(p => p.Status).HasConversion<string>();

            builder.Entity<Employee>().HasMany(e => e.Positions).WithOne(p => p.Employee).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Position>().HasOne(p => p.JobTitle);
            builder.Entity<Position>().HasOne(p => p.WorkType);
            //builder.Entity<Position>().HasOne(p => p.JobCategory);
            builder.Entity<Position>().HasOne(p => p.Unit);

            PositionEntity(builder).HasOne(p => p.LeaveDetail).WithOne(ld => ld.Position).HasForeignKey<Position>(p => p.LeaveDetailId);

            builder.Entity<Position>().Property(e => e.StartDate).IsRequired();
            builder.Entity<Position>(po =>
            {
                po.Property(e => e.Salary).IsRequired();
                po.Property(e => e.Salary).HasColumnType("decimal(18, 6)");
            });
            #endregion

            #region Jobs
            builder.Entity<JobTitle>().HasOne(e => e.JobCategory).WithMany(e => e.JobTitles);
            #endregion
        }

        private static Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Position> PositionEntity(ModelBuilder builder)
        {
            return builder.Entity<Position>();
        }
    }
}
