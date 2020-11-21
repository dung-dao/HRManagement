using AutoMapper;
using HRData.Data;
using HRData.Models;
using HRWebApplication.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenericController<Entity, DTO> : ControllerBase where Entity : EntityBase where DTO: DTOBase
    {
        protected readonly ApplicationDbContext _context;
        protected readonly DbSet<Entity> entities;
        protected readonly IMapper _mapper;
        public GenericController(ApplicationDbContext context, IMapper mapper)
        {
            this._context = context;
            _mapper = mapper;
            this.entities = this._context.Set<Entity>();
        }

        [HttpGet(Name = "[controller]_GetAll")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public virtual async Task<ActionResult<IEnumerable<DTO>>> GetAll()
        {
            var data = await entities.Where(e => e.RecordStatus == RecordStatus.Active).ToListAsync();
            return _mapper.Map<List<DTO>>(data);
        }

        [HttpGet("{id}", Name = "[controller]_GetById")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public virtual async Task<ActionResult<DTO>> GetById(int id)
        {
            var item = await entities.FindAsync(id);

            if (item == null || item.RecordStatus == RecordStatus.InActive)
            {
                return NotFound();
            }

            return _mapper.Map<DTO>(item);
        }

        [HttpPut("{id}", Name = "[controller]_Update")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
        public virtual async Task<IActionResult> Put(int id, DTO data)
        {
            var entity = _mapper.Map<Entity>(data);

            if (id != entity.Id)
            {
                return BadRequest();
            }

            _context.Entry(entity).State = EntityState.Modified;
            _context.Entry(entity).Property(e => e.RecordStatus).IsModified = false;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost(Name = "[controller]_Create")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Post))]
        public virtual async Task<ActionResult<DTO>> Post(DTO data)
        {
            var entity = _mapper.Map<Entity>(data);
            entity.RecordStatus = RecordStatus.Active;
            entities.Add(entity);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetById", new { id = entity.Id }, _mapper.Map<DTO>(entity));
        }

        [HttpDelete("{id}", Name = "[controller]_Delete")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Delete))]
        public virtual async Task<IActionResult> Delete(int id)
        {
            var entity = await entities.FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }

            entity.RecordStatus = RecordStatus.InActive;
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool Exists(int id)
        {
            return _context.OrganizationUnits.Any(e => e.Id == id);
        }
    }
}
