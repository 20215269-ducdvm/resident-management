using Microsoft.EntityFrameworkCore;
using ResidentsApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure DbContext with dependency injection
builder.Services.AddDbContext<ResidentContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("ResidentDBLocalConnection")));

// Add the database exception filter
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
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

    var context = services.GetRequiredService<ResidentContext>();

    context.Database.EnsureCreated();
    
    DbInitializer.Initialize(context);
}
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
