using BikeStores.API.Application;
using BikeStores.API.Infrastructure.Data;
using BikeStores.API.Infrastructure.Helpers.Mapper;

var builder = WebApplication.CreateBuilder(args);


string connectionString = builder.Configuration.GetConnectionString("BikeStoresConnection");
builder.Services.AddMapper();
builder.Services.AddControllers(options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);
builder.Services.AddBlogRepositories(opt => opt.ConnectionString = connectionString);
builder.Services.AddApplications();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "BikeStores.API",
                      policy =>
                      {
                          policy.AllowAnyMethod();
                          policy.AllowAnyHeader();
                          policy.AllowAnyOrigin();
                      });
});


var app = builder.Build();



if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("BikeStores.API");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
