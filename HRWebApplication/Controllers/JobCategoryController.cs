using AutoMapper;
using HRData.Data;
using HRData.Models.JobModels;
using HRWebApplication.Controllers.Base;
using HRWebApplication.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers
{
    public class JobCategoryController : GenericController<JobCategory, JobCategoryDTO>
    {
        public JobCategoryController(ApplicationDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}
