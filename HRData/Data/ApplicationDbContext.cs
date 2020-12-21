using HRData.Models;
using HRData.Models.JobModels;
using HRData.Models.Organization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace HRData.Data
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        #region DbSet
        public DbSet<OrganizationUnit> OrganizationUnits { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<JobTitle> JobTitles { get; set; }
        public DbSet<JobCategory> JobCategories { get; set; }
        public DbSet<WorkType> WorkType { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<LeaveType> LeaveTypes { get; set; }

        //public DbSet<TimeSheet> TimeSheets { get; set; }
        #endregion

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
            RegisterEntity<Employee>(builder);
            RegisterEntity<Position>(builder);
            RegisterEntity<LeaveType>(builder);

            #endregion

            #region Organization

            builder.Entity<OrganizationUnit>()
                .HasMany(e => e.Children).WithOne(e => e.Parent)
                .HasForeignKey(e => e.ParentId)
                .OnDelete(DeleteBehavior.NoAction);
            #endregion

            #region Employee
            builder.Entity<Employee>(e =>
            {
                e.Property(e => e.DateOfBirth).HasColumnType("date");
            });
            builder.Entity<Employee>().HasMany(e => e.Positions).WithOne(p => p.Employee).OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<Position>().HasOne(p => p.JobTitle);
            builder.Entity<Position>().HasOne(p => p.WorkType);
            builder.Entity<Position>().HasOne(p => p.Unit);

            builder.Entity<Position>(po =>
            {
                po.Property(e => e.StartDate).IsRequired();
                po.Property(e => e.Salary).IsRequired();
                po.Property(e => e.Salary).HasColumnType("decimal(18, 6)");
                po.Property(e => e.StartDate).HasColumnType("date");
                po.Property(e => e.EndDate).HasColumnType("date");
                po.Property(e => e.LeaveDate).HasColumnType("date");
            });
            #endregion

            #region Jobs
            builder.Entity<JobTitle>().HasOne(e => e.JobCategory).WithMany(e => e.JobTitles).HasForeignKey(e => e.JobCategoryId).OnDelete(DeleteBehavior.NoAction);
            #endregion
        }

        private static Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Position> PositionEntity(ModelBuilder builder)
        {
            return builder.Entity<Position>();
        }
    }
}
