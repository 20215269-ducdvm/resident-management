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
    public class ResidentController : ControllerBase
    {
        private readonly UnitOfWork<ResidentDBContext> unitOfWork = new();
        private readonly GenericRepository<Resident> genericRepository;
        private readonly ResidentRepository residentRepository;

        public ResidentController()
        {
            // If you want to use Generic Repository with Unit of work
            genericRepository = new GenericRepository<Resident>(unitOfWork);

            // If you want to use a Specific Repository with Unit of work
            residentRepository = new ResidentRepository(unitOfWork);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Resident>> GetResidents()
        {
            var residents = genericRepository.GetAll();
            return Ok(residents);
        }


        [HttpGet("{id:long}")]
        public ActionResult<Resident> GetResident(long id, [FromQuery] bool includeApartment = false)
        {
            Resident resident;
            if (includeApartment)
            {
                resident = residentRepository.GetResidentWithApartment(id);
            }
            else
            {
                resident = genericRepository.GetById(id);
            }

            if (resident == null)
            {
                return NotFound();
            }

            return Ok(resident);
        }
        [HttpPost]
        public ActionResult<Resident> PostResident(Resident resident)
        {
            try
            {
                unitOfWork.CreateTransaction();

                if (ModelState.IsValid)
                {
                    genericRepository.Insert(resident);
                    unitOfWork.Save();
                    unitOfWork.Commit();
                    return CreatedAtAction(nameof(GetResident), new { id = resident.ResidentId }, resident);
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
        public ActionResult<Resident> PutResident(long id, Resident resident)
        {
            if (id != resident.ResidentId)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                genericRepository.Update(resident);
                unitOfWork.Save();

                return NoContent();
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id:long}")]
        public ActionResult<Resident> DeleteResident(long id)
        {
            Resident model = genericRepository.GetById(id);

            if (model == null)
            {
                return NotFound();
            }

            genericRepository.Delete(model);
            unitOfWork.Save();
            return NoContent();
        }

        [HttpGet("name/{name}")]
        public ActionResult<IEnumerable<Resident>> GetResidentsByName(string name)
        {
            var residents = residentRepository.GetResidentsByName(name);
            return Ok(residents);
        }

        [HttpGet("phone/{phoneNumber}")]
        public ActionResult<IEnumerable<Resident>> GetResidentByPhoneNumber(string phoneNumber)
        {
            var residents = residentRepository.GetResidentByPhoneNumber(phoneNumber);
            return Ok(residents);
        }
    }
}