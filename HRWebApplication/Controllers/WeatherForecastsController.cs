using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRData.Data;
using HRData.Models;

namespace HRWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherForecastsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WeatherForecastsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetAll")]
        public async Task<ActionResult<IEnumerable<WeatherForecast>>> GetWeatherForecasts()
        {
            return await _context.WeatherForecasts.ToListAsync();
        }

        [HttpGet("{id}", Name = "GetById")]
        public async Task<ActionResult<WeatherForecast>> GetWeatherForecast(int id)
        {
            var weatherForecast = await _context.WeatherForecasts.FindAsync(id);

            if (weatherForecast == null)
            {
                return NotFound();
            }

            return weatherForecast;
        }

        [HttpPut("{id}", Name = "Update")]
        public async Task<IActionResult> PutWeatherForecast(int id, WeatherForecast weatherForecast)
        {
            if (id != weatherForecast.Id)
            {
                return BadRequest();
            }

            _context.Entry(weatherForecast).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WeatherForecastExists(id))
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

        [HttpPost(Name = "Create")]
        public async Task<ActionResult<WeatherForecast>> PostWeatherForecast(WeatherForecast weatherForecast)
        {
            _context.WeatherForecasts.Add(weatherForecast);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWeatherForecast", new { id = weatherForecast.Id }, weatherForecast);
        }

        // DELETE: api/WeatherForecasts/5
        [HttpDelete("{id}", Name = "Delete")]
        public async Task<IActionResult> DeleteWeatherForecast(int id)
        {
            var weatherForecast = await _context.WeatherForecasts.FindAsync(id);
            if (weatherForecast == null)
            {
                return NotFound();
            }

            _context.WeatherForecasts.Remove(weatherForecast);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WeatherForecastExists(int id)
        {
            return _context.WeatherForecasts.Any(e => e.Id == id);
        }
    }
}
