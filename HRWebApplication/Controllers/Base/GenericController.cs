using HRData.Data;
using HRData.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenericController<Entity> : ControllerBase where Entity : EntityBase
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Entity> entities;
        public GenericController(ApplicationDbContext context)
        {
            this._context = context;
            this.entities = this._context.Set<Entity>();
        }

        [HttpGet(Name = "[controller]_GetAll")]
        public virtual async Task<ActionResult<IEnumerable<Entity>>> GetAll()
        {
            return await entities.ToListAsync();
        }

        [HttpGet("{id}", Name = "[controller]_GetById")]
        public virtual async Task<ActionResult<Entity>> GetById(int id)
        {
            var item = await entities.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpPut("{id}", Name = "[controller]_Update")]
        public virtual async Task<IActionResult> Put(int id, Entity entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }

            _context.Entry(entity).State = EntityState.Modified;

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
        public virtual async Task<ActionResult<Entity>> Post(Entity entity)
        {
            entities.Add(entity);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetById", new { id = entity.Id }, entity);
        }

        // DELETE: api/OrganizationUnits/5
        [HttpDelete("{id}", Name = "[controller]_Delete")]
        public virtual async Task<IActionResult> Delete(int id)
        {
            var entity = await entities.FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }

            entities.Remove(entity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Exists(int id)
        {
            return _context.OrganizationUnits.Any(e => e.Id == id);
        }
    }
}
