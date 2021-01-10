using HRData.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;

namespace HRWebApplication.Controllers
{
    public class LeaveEntitlementController : ApiControllerBase
    {
        public LeaveEntitlementController(IUserRepository userRepository) : base(userRepository)
        {
        }

        //public IActionResult AddLeaveEntitlement()
        //{
        //    throw new NotImplementedException();
        //}
    }
}