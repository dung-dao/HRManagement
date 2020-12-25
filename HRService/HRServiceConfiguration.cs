using HRData.Repositories;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace HRService
{
    public static class HRServiceConfiguration
    {
        public static void AddHRServices(this IServiceCollection services)
        {
            services.AddScoped<IEmployeeRepostiory, EmployeeRepostiory>();
            services.AddScoped<IOrganizationRepository, OrganizationRepository>();
            services.AddScoped<ITimeSheetRepository, TimeSheetRepository>();
        }
    }
}
