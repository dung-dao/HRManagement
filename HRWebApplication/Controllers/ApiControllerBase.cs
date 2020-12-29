using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiControllerBase : ControllerBase
    {
        private const string userIdKey = "userid";
        protected string GetUserId()
        {
            var idClaim = User.Claims.FirstOrDefault(c => c.Type == userIdKey);
            return idClaim == null ? null : idClaim.Value;
}
    }
}
