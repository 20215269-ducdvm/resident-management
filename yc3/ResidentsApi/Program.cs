using ResidentsApi.DAL;
using ResidentsApi.Repository;
using ResidentsApi.UnitOfWork;
using ResidentsApi.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add the DbContext to the container
// builder.Services.AddDbContext<ResidentDBContext>(options =>
//     options.UseNpgsql(builder.Configuration.GetConnectionString("ResidentDBLocalConnection")));

builder.Services.AddDbContext<ResidentDBContext>();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// Add the UnitOfWork to the container
builder.Services.AddScoped<IUnitOfWork<ResidentDBContext>, UnitOfWork<ResidentDBContext>>();

// Add the Repository classes to the container
builder.Services.AddScoped<IResidentRepository, ResidentRepository>();
builder.Services.AddScoped<IApartmentRepository, ApartmentRepository>();
builder.Services.AddScoped<IResidentApartmentRepository, ResidentApartmentRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}

// Ensure the database is created
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<ResidentDBContext>();

    context.Database.EnsureCreated();
    
    DbInitializer.Initialize(context);
}
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
