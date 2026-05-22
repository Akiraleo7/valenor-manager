using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi;
using ValenorManager.API.Data;
using ValenorManager.API.Services;

var builder = WebApplication.CreateBuilder(args);

// =========================
// CONFIGURAÇÃO DO BANCO
// =========================
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(
            builder.Configuration.GetConnectionString("DefaultConnection")
        )
    )
);

// =========================
// JWT AUTH
// =========================
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
            )
        };
    });

// =========================
// AUTHORIZATION
// =========================
builder.Services.AddAuthorization();

// =========================
// CONTROLLERS
// =========================
builder.Services.AddControllers();

// =========================
// SWAGGER
// =========================
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new()
    {
        Title = "Valenor API",
        Version = "v1"
    });
});

// =========================
// SERVICES
// =========================
builder.Services.AddScoped<ProdutoService>();
builder.Services.AddScoped<VendaService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<AuditService>();

var app = builder.Build();

// =========================
// SWAGGER
// =========================
app.UseSwagger();

app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Valenor API V1");
    c.RoutePrefix = string.Empty;
});

// =========================
// MIDDLEWARES
// =========================
app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();