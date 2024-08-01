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
    public class ResidentApartmentsController : ControllerBase
    {
        private readonly ResidentContext _context;

        public ResidentApartmentsController(ResidentContext context)
        {
            _context = context;
        }

        // GET: api/ResidentApartments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResidentApartment>>> GetResidentApartments()
        {
            return await _context.ResidentApartments.ToListAsync();
        }

        // GET: api/ResidentApartments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ResidentApartment>> GetResidentApartment(long id)
        {
            var residentApartment = await _context.ResidentApartments.FindAsync(id);

            if (residentApartment == null)
            {
                return NotFound();
            }

            return residentApartment;
        }

        // PUT: api/ResidentApartments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResidentApartment(long id, ResidentApartment residentApartment)
        {
            if (id != residentApartment.ResidentId)
            {
                return BadRequest();
            }

            _context.Entry(residentApartment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResidentApartmentExists(id))
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

        // POST: api/ResidentApartments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ResidentApartment>> PostResidentApartment(ResidentApartment residentApartment)
        {
            _context.ResidentApartments.Add(residentApartment);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ResidentApartmentExists(residentApartment.ResidentId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetResidentApartment", new { id = residentApartment.ResidentId }, residentApartment);
        }

        // DELETE: api/ResidentApartments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResidentApartment(long id)
        {
            var residentApartment = await _context.ResidentApartments.FindAsync(id);
            if (residentApartment == null)
            {
                return NotFound();
            }

            _context.ResidentApartments.Remove(residentApartment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResidentApartmentExists(long id)
        {
            return _context.ResidentApartments.Any(e => e.ResidentId == id);
        }
    }
}
