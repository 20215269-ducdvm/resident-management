using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        private UnitOfWork<ResidentDBContext> unitOfWork = new UnitOfWork<ResidentDBContext>();
        private GenericRepository<Resident> genericRepository;
        private IResidentRepository residentRepository;

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
        public ActionResult<Resident> GetResident(long id)
        {
            var residents = genericRepository.GetById(id);
            return Ok(residents);
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

                return RedirectToAction("Index", "Resident");
            }

            return BadRequest(ModelState);
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
                    return RedirectToAction("Index", "Resident");
                }

                return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                unitOfWork.Rollback();
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
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
            return RedirectToAction("Index", "Resident");
        }

        [HttpGet("{name}")]
        public ActionResult<IEnumerable<Resident>> GetResidentsByName(string name)
        {
            var residents = residentRepository.GetResidentsByName(name);
            return Ok(residents);
        }
    }
}