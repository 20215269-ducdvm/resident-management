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
    public class ResidentApartmentController : ControllerBase
    {
        private readonly UnitOfWork<ResidentDBContext> unitOfWork = new();
        private readonly GenericRepository<ResidentApartment> genericRepository;
        private readonly ResidentApartmentRepository residentApartmentRepository;

        public ResidentApartmentController()
        {
            // If you want to use Generic Repository with Unit of work
            genericRepository = new GenericRepository<ResidentApartment>(unitOfWork);
            
            // If you want to use a Specific Repository with Unit of work
            residentApartmentRepository = new ResidentApartmentRepository(unitOfWork);
        }

        [HttpGet]
        public ActionResult<IEnumerable<ResidentApartment>> GetResidentApartments()
        {
            var ResidentApartments = genericRepository.GetAll();            
            return Ok(ResidentApartments);
        }


        [HttpGet("{id:long}")]
        public ActionResult<ResidentApartment> GetResidentApartment(long id, [FromQuery] bool includeResidentAndApartment = false)
        {
            ResidentApartment residentApartment;
            if (includeResidentAndApartment)
            {
                residentApartment = residentApartmentRepository.GetResidentApartmentById(id);
            }
            else
            {
                residentApartment = genericRepository.GetById(id);
            }

            if (residentApartment == null)
            {
                return NotFound();
            }

            return Ok(residentApartment);
        }

        [HttpPost]
        public ActionResult<ResidentApartment> PostResidentApartment(ResidentApartment residentApartment)
        {
            try
            {
                unitOfWork.CreateTransaction();

                if (ModelState.IsValid)
                {
                    genericRepository.Insert(residentApartment);
                    unitOfWork.Save();
                    unitOfWork.Commit();
                    return CreatedAtAction(nameof(GetResidentApartment), new { id = residentApartment.ResidentApartmentId }, residentApartment);
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
        public ActionResult<ResidentApartment> PutResidentApartment(long id, ResidentApartment residentApartment)
        {
            if (id != residentApartment.ResidentApartmentId)
            {
                return BadRequest();
            }
            
            if (ModelState.IsValid)
            {
                genericRepository.Update(residentApartment);
                unitOfWork.Save();

                return NoContent();
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id:long}")]
        public ActionResult<Apartment> DeleteResidentApartment(long id)
        {
            ResidentApartment model = genericRepository.GetById(id);

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