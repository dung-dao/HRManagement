using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using HRData.Data;
using HRData.Models;
using HRData.Models.SalaryModels;
using HRWebApplication.Controllers.Base;
using HRWebApplication.DTO;
using Microsoft.AspNetCore.Authorization;

namespace HRWebApplication.Controllers
{
    [Authorize(Roles = "Admin,Manager")]
    public class HolidayController : GenericController<Holiday, HolidayDTO>
    {
        public HolidayController(ApplicationDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}
