using AutoMapper;
using HRData.Models;
using HRData.Models.JobModels;
using HRData.Models.Organization;
using HRData.Models.SalaryModels;
using HRWebApplication.DTO.Mapper;
using HRWebApplication.DTO.Salary;
using HRWebApplication.DTO.TimeSheet;

namespace HRWebApplication.DTO
{
    public class AppMapping : Profile
    {
        private void CreateIgnoreVirtualMap<Entity, DTO>() where Entity : EntityBase where DTO : DTOBase
        {
            CreateMap<Entity, DTO>();
            CreateMap<DTO, Entity>().IgnoreAllVirtual();
        }
        public AppMapping()
        {
            CreateMap<OrganizationUnit, OrganizationUnitDTO>().ReverseMap();
            CreateMap<Employee, EmployeeDTO>().ReverseMap();

            CreateIgnoreVirtualMap<WorkType, WorkTypeDTO>();
            CreateIgnoreVirtualMap<JobCategory, JobCategoryDTO>();
            CreateIgnoreVirtualMap<JobTitle, JobTitleDTO>();
            CreateIgnoreVirtualMap<PayRoll, PayRollDTO>();
            CreateIgnoreVirtualMap<PaySlip, PaySlipDTO>();

            CreateMap<Position, PositionDTO>().ReverseMap();

            CreateMap<User, UserDTO>().ForMember(u => u.Password, opt => opt.Ignore());

            CreateMap<TimeOffType, TimeOffTypeDTO>().ReverseMap();
            CreateMap<Holiday, HolidayDTO>().ReverseMap();
        }
    }
}
