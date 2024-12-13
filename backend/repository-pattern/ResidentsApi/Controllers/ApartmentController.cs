using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ResidentsApi.Repository;
using ResidentsApi.DAL;
using ResidentsApi.GenericRepository;
using ResidentsApi.UnitOfWork;

namespace ResidentsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApartmentController : ControllerBase
    {
        private readonly UnitOfWork<ResidentDBContext> unitOfWork = new();
        private readonly GenericRepository<Apartment> genericRepository;
        private readonly ApartmentRepository apartmentRepository;

        public ApartmentController()
        {
            // If you want to use Generic Repository with Unit of work
            genericRepository = new GenericRepository<Apartment>(unitOfWork);
            
            // If you want to use a Specific Repository with Unit of work
            apartmentRepository = new ApartmentRepository(unitOfWork);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Apartment>> GetApartments()
        {
            var Apartments = genericRepository.GetAll();            
            return Ok(Apartments);
        }


        [HttpGet("{id:long}")]
        public ActionResult<Apartment> GetApartment(long id, [FromQuery] bool includeResident = false)
        {
            Apartment Apartment;
            if (includeResident)
            {
                Apartment = apartmentRepository.GetApartmentWithResident(id);
            }
            else
            {
                Apartment = genericRepository.GetById(id);
            }

            if (Apartment == null)
            {
                return NotFound();
            }

            return Ok(Apartment);
        }
        
        [HttpPost]
        public ActionResult<Apartment> PostApartment(Apartment apartment)
        {
            try
            {
                unitOfWork.CreateTransaction();

                if (ModelState.IsValid)
                {
                    genericRepository.Insert(apartment);
                    unitOfWork.Save();
                    unitOfWork.Commit();
                    return CreatedAtAction(nameof(GetApartment), new { id = apartment.ApartmentId }, apartment);
                }

                return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                unitOfWork.Rollback();
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("{id:long}")]
        public ActionResult<Apartment> PutApartment(long id, Apartment Apartment)
        {
            if (id != Apartment.ApartmentId)
            {
                return BadRequest();
            }
            
            if (ModelState.IsValid)
            {
                genericRepository.Update(Apartment);
                unitOfWork.Save();

                return NoContent();
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id:long}")]
        public ActionResult<Apartment> DeleteApartment(long id)
        {
            Apartment model = genericRepository.GetById(id);

            if (model == null)
            {
                return NotFound();
            }

            genericRepository.Delete(model);
            unitOfWork.Save();
            return NoContent();
        }
    }
}