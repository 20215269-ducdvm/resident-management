using ResidentsApi.DAL;
using ResidentsApi.Repository;
using ResidentsApi.UnitOfWork;
using ResidentsApi.Data;

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

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000/residents",
                                "http://localhost:3000/apartments",
                                "http://localhost:3000/residentapartments")
                   .AllowAnyHeader() 
                   .AllowAnyMethod();
        });
});
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

    DbInitializer.Initialize(context);
}


app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowLocalhost3000");

app.UseAuthorization();

app.MapControllers();

app.Use(async (context, next) =>
{
    if (context.Request.Method == "OPTIONS")
    {
        context.Response.Headers.Append("Access-Control-Allow-Origin", "http://localhost:3000");
        context.Response.Headers.Append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        context.Response.Headers.Append("Access-Control-Allow-Headers", "Content-Type, Authorization");
        context.Response.StatusCode = 204; // No Content
        return;
    }

    await next();
});

app.Use(async (context, next) =>
{
    context.Response.Headers.Append("Access-Control-Allow-Origin", "http://localhost:3000");
    context.Response.Headers.Append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    context.Response.Headers.Append("Access-Control-Allow-Headers", "Content-Type, Authorization");
    await next.Invoke();
});

app.Use(async (context, next) =>
{
    await next.Invoke();

    // Log response headers
    foreach (var header in context.Response.Headers)
    {
        Console.WriteLine($"{header.Key}: {header.Value}");
    }
});

app.Run();
