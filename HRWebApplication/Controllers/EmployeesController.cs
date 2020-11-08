using HRData.Data;
using HRData.Models;
using HRData.Models.JobModels;
using HRWebApplication.Controllers.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers
{
    public class EmployeesController : GenericController<Employee>
    {
        public EmployeesController(ApplicationDbContext context) : base(context)
        {
        }

        [HttpGet("{id}/Position", Name = "[controller]_GetCurrentPosition")]
        public ActionResult<Position> GetCurrentPosition()
        {
            return new Position();
        }
    }
}
