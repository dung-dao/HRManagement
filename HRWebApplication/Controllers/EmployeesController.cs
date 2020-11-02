using HRData.Data;
using HRData.Models;
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
    }
}
