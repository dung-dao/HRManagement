using HRData.Data;
using HRData.Models.JobModels;
using HRWebApplication.Controllers.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers
{
    public class EmploymentStatusController : GenericController<EmploymentStatus>
    {
        public EmploymentStatusController(ApplicationDbContext context) : base(context)
        {
        }
    }
}
