using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResidentsApi.Models;
using ResidentsApi.Data;
namespace ResidentsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResidentsController : ControllerBase
    {
        private readonly ResidentContext _context;

        public ResidentsController(ResidentContext context)
        {
            _context = context;
        }

        // GET: api/Residents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Resident>>> GetResidents()
        {
            return await _context.Residents.ToListAsync();
        }

        // GET: api/Residents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Resident>> GetResident(long id)
        {
            var resident = await _context.Residents.FindAsync(id);

            if (resident == null)
            {
                return NotFound();
            }

            return resident;
        }

        // PUT: api/Residents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResident(long id, Resident resident)
        {
            if (id != resident.ResidentId)
            {
                return BadRequest();
            }

            _context.Entry(resident).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResidentExists(id))
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

        // POST: api/Residents
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Resident>> PostResident(Resident resident)
        {
            _context.Residents.Add(resident);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResident", new { id = resident.ResidentId }, resident);
        }

        // DELETE: api/Residents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResident(long id)
        {
            var resident = await _context.Residents.FindAsync(id);
            if (resident == null)
            {
                return NotFound();
            }

            _context.Residents.Remove(resident);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Residents
        [HttpDelete]
        public async Task<IActionResult> DeleteResidents()
        {
            var residents = await _context.Residents.ToListAsync();
            if (residents == null)
            {
                return NotFound();
            }

            _context.Residents.RemoveRange(residents);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResidentExists(long id)
        {
            return _context.Residents.Any(e => e.ResidentId == id);
        }
    }
}
