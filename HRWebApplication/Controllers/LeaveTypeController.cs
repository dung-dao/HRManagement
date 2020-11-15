using HRData.Data;
using HRData.Models;
using HRWebApplication.Controllers.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers
{
    public class LeaveTypeController : GenericController<LeaveType>
    {
        public LeaveTypeController(ApplicationDbContext context) : base(context)
        {
        }
    }
}
