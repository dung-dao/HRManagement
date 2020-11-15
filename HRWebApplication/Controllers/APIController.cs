using AutoMapper;
using HRData.Data;
using HRData.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace HRWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APIController : ControllerBase
    {
        protected readonly IMapper _mapper;
        protected readonly ApplicationDbContext _context;
        public APIController(ApplicationDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        protected int Commit() => _context.SaveChanges();
        protected bool Exists<T>(int id) where T : EntityBase => _context.Set<T>().Any(e => e.Id == id);
    }
}
