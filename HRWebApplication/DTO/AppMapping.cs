using AutoMapper;
using HRData.Models;
using HRData.Models.Organization;

namespace HRWebApplication.DTO
{
    public class AppMapping : Profile
    {
        public AppMapping()
        {
            CreateMap<OrganizationUnit, OrganizationUnitDTO>().ReverseMap();
        }
    }
}
