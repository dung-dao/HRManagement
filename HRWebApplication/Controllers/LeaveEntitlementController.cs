using HRData.Repositories;
using HRWebApplication.DTO.TimeSheet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;

namespace HRWebApplication.Controllers
{
    public class LeaveEntitlementController : ApiControllerBase
    {
        public LeaveEntitlementController(IUserRepository userRepository) : base(userRepository)
        {
        }

        [Authorize]
        [HttpGet]
        public ActionResult<IEnumerable<LeaveEntitlementDTO>> Get()
        {
            var user = GetAuthorizedUser();
            return NoContent();
        }
    }
}