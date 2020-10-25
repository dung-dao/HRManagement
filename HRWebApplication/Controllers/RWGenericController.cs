using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRData.Data;
using HRData.Models;
using AutoMapper;
using HRWebApplication.DTO;
using System.Security.Permissions;

namespace HRWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RWGenericController<T, DTO> : ControllerBase where T : EntityBase where DTO : DTOBase
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<T> _table;
        private readonly Mapper _mapper;

        public RWGenericController(ApplicationDbContext context, Mapper mapper)
        {
            _context = context;
            this._table = _context.Set<T>();
            this._mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DTO>>> GetAll()
        {
            var records = await _table.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<DTO>>(records));
            //return mapper.Map<DTO>(await table.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DTO>> GetById(int id)
        {
            var item = await _table.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<DTO>(item));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, DTO item)
        {
            var entry = _mapper.Map<T>(item);
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(entry).State = EntityState.Modified;

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

        [HttpPost]
        public async Task<ActionResult<DTO>> Create(DTO item)
        {
            var entry = _mapper.Map<T>(item);
            _table.Add(entry);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetById", new { id = item.Id }, item);
        }

        // DELETE: api/WeatherForecasts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entry = await _table.FindAsync(id);
            if (entry == null)
            {
                return NotFound();
            }

            _table.Remove(entry);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Exists(int id)
        {
            return _context.WeatherForecasts.Any(e => e.Id == id);
        }
    }
}
