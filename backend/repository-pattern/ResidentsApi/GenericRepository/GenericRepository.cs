using ResidentsApi.DAL;
using ResidentsApi.UnitOfWork;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace ResidentsApi.GenericRepository
{
    public class GenericRepository<T> : IGenericRepository<T>, IDisposable where T : class
    {
        private DbSet<T>? _entities;
        private string _errorMessage = string.Empty;
        private bool _isDisposed;

        //While Creating an Instance of GenericRepository, we need to pass the UnitOfWork instance
        //That UnitOfWork instance contains the Context Object that our GenericRepository is going to use
        [ActivatorUtilitiesConstructor]
        public GenericRepository(IUnitOfWork<ResidentDBContext> unitOfWork)
            : this(unitOfWork.Context)
        {
        }

        //If you don't want to use Unit of Work, then use the following Constructor 
        //which takes the context Object as a parameter
        public GenericRepository(ResidentDBContext context)
        {
            //Initialize _isDisposed to false and then set the Context Object
            _isDisposed = false;
            Context = context;
        }

        //The following Property is going to return the Context Object
        public ResidentDBContext Context { get; set; }
        
        //The following Property is going to set and return the Entity
        //Lazy loading: only assign a value to _entities when it is accessed for the first time
        protected virtual DbSet<T> Entities
        {
            get { return _entities ?? (_entities = Context.Set<T>()); }
        }

        //The following Method is going to Dispose of the Context Object
        public void Dispose()
        {
            if (Context != null)
                Context.Dispose();
            _isDisposed = true;
        }

        //Return all the Records from the Corresponding Table
        public virtual IEnumerable<T> GetAll()
        {
            return Entities.ToList();
        }

        //Return a Record from the Coresponding Table based on the Primary Key
        public virtual T GetById(object id)
        {
            return  Entities.Find(id);
        }

        //The following Method is going to Insert a new entity into the table
        public virtual void Insert(T entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException("Entity");
                }  
                
                if (Context == null || _isDisposed)
                {
                    Context = new ResidentDBContext();
                }

                Entities.Add(entity);

                //commented out call to SaveChanges as Context save changes will be
                //called with Unit of work
                //Context.SaveChanges(); 
            }
            catch (DbUpdateException dbEx)
            {
                HandleUnitOfWorkException(dbEx);
                throw new Exception(_errorMessage, dbEx);
            }
        }
        
        //The following Method is going to Update an existing entity in the table
        public virtual void Update(T entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException("Entity");
                }
                    
                if (Context == null || _isDisposed)
                {
                    Context = new ResidentDBContext();
                }
                Context.Entry(entity).State = EntityState.Modified;
                //commented out call to SaveChanges as Context save changes will be called with Unit of work
                //Context.SaveChanges(); 
            }
            catch (DbUpdateException dbEx)
            {
                HandleUnitOfWorkException(dbEx);
                throw new Exception(_errorMessage, dbEx);
            }
        }

        //The following Method is going to Delete an existing entity from the table
        public virtual void Delete(T entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException("Entity");
                }

                if (Context == null || _isDisposed)
                {
                    Context = new ResidentDBContext();
                }
                
                Entities.Remove(entity);
                //commented out call to SaveChanges as Context save changes will be called with Unit of work
                //Context.SaveChanges(); 
            }
            catch (DbUpdateException dbEx)
            {
                HandleUnitOfWorkException(dbEx);
                throw new Exception(_errorMessage, dbEx);
            }
        }

        public virtual void Save() 
        {
            try
            {
                Context.SaveChanges();
            }
            catch (DbUpdateException dbEx)
            {
                HandleUnitOfWorkException(dbEx);
                throw new Exception(_errorMessage, dbEx);
            }
        }
        private void HandleUnitOfWorkException(DbUpdateException dbEx)
        {
            // Handle database update exception
            _errorMessage = $"An error occurred while updating the database: {dbEx.Message}";        
        }
    }
} 