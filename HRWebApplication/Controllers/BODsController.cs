using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRData.Data;

namespace HRWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BODsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BODsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BODs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BOD>>> GetBODs()
        {
            return await _context.BODs.ToListAsync();
        }

        // GET: api/BODs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BOD>> GetBOD(int id)
        {
            var bOD = await _context.BODs.FindAsync(id);

            if (bOD == null)
            {
                return NotFound();
            }

            return bOD;
        }

        // PUT: api/BODs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBOD(int id, BOD bOD)
        {
            if (id != bOD.Id)
            {
                return BadRequest();
            }

            _context.Entry(bOD).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BODExists(id))
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

        // POST: api/BODs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BOD>> PostBOD(BOD bOD)
        {
            _context.BODs.Add(bOD);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBOD", new { id = bOD.Id }, bOD);
        }

        // DELETE: api/BODs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBOD(int id)
        {
            var bOD = await _context.BODs.FindAsync(id);
            if (bOD == null)
            {
                return NotFound();
            }

            _context.BODs.Remove(bOD);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BODExists(int id)
        {
            return _context.BODs.Any(e => e.Id == id);
        }
    }
}
