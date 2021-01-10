using AutoMapper;
using HRData.Data;
using HRData.Models.SalaryModels;
using HRWebApplication.Controllers.Base;
using HRWebApplication.DTO.TimeSheet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeOffTypeController : GenericController<TimeOffType, TimeOffTypeDTO>
    {
        public TimeOffTypeController(ApplicationDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}
