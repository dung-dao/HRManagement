using AutoMapper;
using HRData.Data;
using HRData.Models.JobModels;
using HRWebApplication.Controllers.Base;
using HRWebApplication.DTO;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers
{
    [Authorize(Roles = "Admin,Manager")]
    public class JobTitleController : GenericController<JobTitle, JobTitleDTO>
    {
        public JobTitleController(ApplicationDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}
