using HRData.Models;
using HRData.Models.JobModels;
using HRData.Models.Organization;
using HRData.Models.SalaryModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace HRData.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        private const string SQL_DECIMAL = "decimal(18, 6)";
        private const string SQL_DATE = "date";
        private const string SQL_NOTE = "nvarchar(1000)";

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        #region DbSet
        public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
        public DbSet<Employee> Employees { get; set; }
        
        //Position
        public DbSet<JobTitle> JobTitles { get; set; }
        public DbSet<JobCategory> JobCategories { get; set; }
        public DbSet<WorkType> WorkType { get; set; }
        public DbSet<Position> Positions { get; set; }

        //Working & Leaving Log
        public DbSet<WorkingLog> WorkingLogs { get; set; }
        public DbSet<TimeOffType> TimeOffTypes { get; set; }
        public DbSet<Holiday> Holidays { get; set; }
        #endregion

        private static void RegisterEntity<T>(ModelBuilder builder) where T : EntityBase
        {
            builder.Entity<T>().HasKey(e => e.Id);
            builder.Entity<T>().Property(e => e.RecordStatus).HasConversion<int>();
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            //Use preconfigured api config
            base.OnModelCreating(builder);

            #region Properties
            RegisterEntity<OrganizationUnit>(builder);
            RegisterEntity<JobTitle>(builder);
            RegisterEntity<JobCategory>(builder);
            RegisterEntity<OrganizationUnit>(builder);
            RegisterEntity<WorkType>(builder);
            RegisterEntity<Employee>(builder);
            RegisterEntity<Position>(builder);

            RegisterEntity<SalaryPayment>(builder);
            RegisterEntity<WorkingLog>(builder);
            RegisterEntity<TimeOffType>(builder);
            RegisterEntity<LeaveBalance>(builder);
            RegisterEntity<Holiday>(builder);

            #region Employee
            builder.Entity<Employee>(e =>
            {
                e.Property(e => e.DateOfBirth).HasColumnType("date");
            });
            #endregion

            #region Position
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

            #region Salary
            builder.Entity<SalaryPayment>(sp =>
            {
                sp.Property(e => e.Amount).HasColumnType(SQL_DECIMAL);
                sp.Property(e => e.Period).HasColumnType(SQL_DATE);
            });

            builder.Entity<WorkingLog>(wl =>
            {
                wl.Property(e => e.Date).HasColumnType(SQL_DATE);
                wl.Property(e => e.Note).HasColumnType(SQL_NOTE);
                wl.Property(e => e.Type).HasConversion<string>();
            });
            #endregion

            #endregion

            #region Relationships

            #region Organization
            builder.Entity<OrganizationUnit>()
                .HasMany(e => e.Children).WithOne(e => e.Parent)
                .HasForeignKey(e => e.ParentId)
                .OnDelete(DeleteBehavior.NoAction);
            #endregion

            #region Position
            builder.Entity<Employee>().HasMany(e => e.Positions).WithOne(p => p.Employee).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Position>().HasOne(p => p.JobTitle);
            builder.Entity<Position>().HasOne(p => p.WorkType);
            builder.Entity<Position>().HasOne(p => p.Unit);
            builder.Entity<JobTitle>().HasOne(e => e.JobCategory).WithMany(e => e.JobTitles).HasForeignKey(e => e.JobCategoryId).OnDelete(DeleteBehavior.NoAction);
            #endregion

            #region User
            builder.Entity<User>()
                .HasOne(u => u.Employee)
                .WithOne(e => e.User)
                .HasForeignKey<Employee>(e => e.UserId)
                .OnDelete(DeleteBehavior.SetNull);
            #endregion

            #region Salary
            //Employee - WorkingLog
            builder.Entity<Employee>()
                .HasMany(e => e.WorkingLogs)
                .WithOne(wl => wl.Employee);

            //WorkingLog - TimeOffType
            builder.Entity<TimeOffType>()
                .HasMany(e => e.WorkingLogs)
                .WithOne(wl => wl.TimeOffType);
            //TODO: Config relationship



            //Employee has many salary payment
            // builder.Entity<Employee>()
            //     .HasMany(em => em.SalaryPayments)
            //     .WithOne(sp => sp.Employee);

            //SalaryPayment has many working log
            // builder.Entity<SalaryPayment>()
            //     .HasMany(sp => sp.WorkingLogs)
            //     .WithOne(wl => wl.SalaryPayment);
            

            //Leave Balance
            // builder.Entity<Employee>()
            //     .HasMany(e => e.LeaveBalances)
            //     .WithOne(lb => lb.Employee);
            // builder.Entity<TimeOffType>()
            //     .HasMany(tot => tot.LeaveBalances)
            //     .WithOne(lb => lb.Type);
            #endregion
            #endregion
        }
    }
}
