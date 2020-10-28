using HRData.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace HRData
{
    public static class HRServicesConfiguration
    {
        public static void AddHRServices(this IServiceCollection services)
        {
            services.AddScoped<IOrganizationRepository, OrganizationRepository>();
        }
    }
}
