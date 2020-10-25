using AutoMapper;
using HRData.Data;
using HRWebApplication.DTO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers
{
    public class BDOController : RWGenericController<BOD, BODDTO>
    {
        public BDOController(ApplicationDbContext context, Mapper mapper) : base(context, mapper)
        {
            
        }
    }
}
