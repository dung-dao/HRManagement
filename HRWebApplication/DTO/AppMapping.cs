﻿using AutoMapper;
using HRData.Models;
using HRData.Models.JobModels;
using HRData.Models.Organization;

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
            CreateMap<JobTitle, JobTitleDTO>().ReverseMap();
            CreateMap<LeaveType, LeaveTypeDTO>().ReverseMap();
            CreateMap<Position, PositionDTO>().ReverseMap();

            CreateMap<LeaveDetail, LeaveDetailDTO>().ReverseMap();
            CreateMap<User, UserDTO>()
                .ForMember(u => u.Password, opt => opt.Ignore());
        }
    }
}
