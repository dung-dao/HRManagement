using AutoMapper;
using HRData.Data;
using HRData.Models;
using HRWebApplication.Controllers.Base;
using HRWebApplication.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers
{
    public class LeaveTypeController : GenericController<LeaveType, LeaveTypeDTO>
    {
        public LeaveTypeController(ApplicationDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}
