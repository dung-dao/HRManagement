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
        public DbSet<WeatherForecast> WeatherForecasts { get; set; }
        public DbSet<BOD> BODs { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<BranchStatus> BranchStatuses { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<DepartmentStatus> DepartmentStatuses { get; set; }
        public DbSet<WorkPlace> WorkPlaces { get; set; }

    }
}
