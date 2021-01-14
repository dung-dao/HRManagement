using AutoMapper;
using HRData.Models;
using HRData.Models.JobModels;
using HRData.Models.Organization;
using HRData.Models.SalaryModels;
using HRWebApplication.DTO.Mapper;
using HRWebApplication.DTO.TimeSheet;

namespace HRWebApplication.DTO
{
    public class AppMapping : Profile
    {
        public AppMapping()
        {
            CreateMap<OrganizationUnit, OrganizationUnitDTO>().ReverseMap();
            CreateMap<Employee, EmployeeDTO>().ReverseMap();
            CreateMap<WorkType, WorkTypeDTO>().ReverseMap();
            CreateMap<JobCategory, JobCategoryDTO>().ReverseMap();

            CreateMap<JobTitle, JobTitleDTO>();
            CreateMap<JobCategoryDTO, JobTitle>().IgnoreAllVirtual();

            CreateMap<Position, PositionDTO>().ReverseMap();

            CreateMap<User, UserDTO>()
                .ForMember(u => u.Password, opt => opt.Ignore());
                
            CreateMap<TimeOffType, TimeOffTypeDTO>().ReverseMap();
            CreateMap<Holiday, HolidayDTO>().ReverseMap();
        }
    }
}
