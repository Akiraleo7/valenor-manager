using ValenorManager.API.Services;
using Microsoft.EntityFrameworkCore;
using ValenorManager.API.Data;

var builder = WebApplication.CreateBuilder(args);

// CONFIGURAÇÃO DO DB (AGORA NA ORDEM CERTA KRAI!!)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Service (Scoped correto)
builder.Services.AddScoped<ProdutoService>();

var app = builder.Build();

// Swagger na raiz
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Valenor API V1");
    c.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();