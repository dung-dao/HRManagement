using HRData.Models;
using HRData.Repositories;
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
        private const string userIdKey = "UserId";
        protected readonly IUserRepository _userRepository;

        public ApiControllerBase(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        protected string GetUserId()
        {
            var idClaim = User.Claims.FirstOrDefault(c => c.Type == userIdKey);
            return idClaim == null ? null : idClaim.Value;
        }

        protected User GetAuthorizedUser()
        {
            var userId = GetUserId();
            return userId != null ? _userRepository.GetById(userId) : null;
        }
    }
}
