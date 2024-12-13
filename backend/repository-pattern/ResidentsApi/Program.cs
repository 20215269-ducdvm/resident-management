using ResidentsApi.DAL;
using ResidentsApi.Repository;
using ResidentsApi.UnitOfWork;
using ResidentsApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add the DbContext to the container
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
            policy.WithOrigins("http://localhost:3000")
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

app.UseRouting(); // Route matching happens here

app.UseCors("AllowLocalhost3000"); // Apply CORS policy

// Custom middleware for handling OPTIONS requests
// app.Use(async (context, next) =>
// {
//     if (context.Request.Method == "OPTIONS")
//     {
//         context.Response.Headers.Append("Access-Control-Allow-Origin", "http://localhost:3000");
//         context.Response.Headers.Append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//         context.Response.Headers.Append("Access-Control-Allow-Headers", "Content-Type, Authorization");
//         context.Response.StatusCode = 204; // No Content
//         return;
//     }

//     await next(); // Continue to the next middleware
// });

// app.Use(async (context, next) =>
// {
//     context.Response.Headers.Append("Access-Control-Allow-Origin", "http://localhost:3000");
//     context.Response.Headers.Append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     context.Response.Headers.Append("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     await next();
// });

app.UseAuthorization(); // Authorization checks happen here

app.MapControllers();

// Middleware to log response headers after the request is handled
// app.Use(async (context, next) =>
// {
//     await next.Invoke();
//     foreach (var header in context.Response.Headers)
//     {
//         Console.WriteLine($"{header.Key}: {header.Value}");
//     }
// });

app.Run();