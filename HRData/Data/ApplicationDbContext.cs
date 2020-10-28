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
        //Play around
        public DbSet<WeatherForecast> WeatherForecasts { get; set; }
        
        //Organization
        public DbSet<OrganizationUnit> Departments { get; set; }
        public DbSet<Branch> Branches { get; set; }
    }
}
