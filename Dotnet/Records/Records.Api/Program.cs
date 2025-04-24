using Amazon;
using Amazon.Extensions.NETCore.Setup;
using Amazon.Runtime;
using Amazon.S3;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Records.Api;
using Records.Api.MiddleWares;
using Records.Core;
using Records.Core.IRepositories;
using Records.Core.Iservices;
using Records.Data;
using Records.Data.Repositories;
using Records.Service;
using System.Configuration;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddControllers();
//for transcription 
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 52428800; // Set limit to 50 MB (adjust as needed)
});
//for include
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});
//builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
//builder.Services.AddAWSService<IAmazonS3>();

//almost to delete...
//var access = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY");
//var secret = Environment.GetEnvironmentVariable("AWS_SECRET_KEY");
//var region = Environment.GetEnvironmentVariable("AWS_REGION");
//builder.Services.AddDefaultAWSOptions(new AWSOptions
//{
//    Credentials = new BasicAWSCredentials(builder.Configuration[Environment.GetEnvironmentVariable("AWS_ACCESS_KEY")],
//    builder.Configuration[Environment.GetEnvironmentVariable("AWS_SECRET_KEY")]),
//    Region = RegionEndpoint.GetBySystemName(builder.Configuration[Environment.GetEnvironmentVariable("AWS_REGION")])
//});
var access = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY");
var secret = Environment.GetEnvironmentVariable("AWS_SECRET_KEY");
var region = Environment.GetEnvironmentVariable("AWS_REGION");

builder.Services.AddDefaultAWSOptions(new AWSOptions
{
    Credentials = new BasicAWSCredentials(access, secret),
    Region = RegionEndpoint.GetBySystemName(region)
});
builder.Services.AddAWSService<IAmazonS3>();
//______________addscope
builder.Services.AddScoped<IUserService,UserService>();
builder.Services.AddScoped<IRecordService,RecordService>();
builder.Services.AddScoped<IFolderService,FolderService>();

//_____add for amazon

//builder.Services.AddAWSService<IAmazonS3>();
//_____________
builder.Services.AddScoped<IUserRepository,UserRepository>();
builder.Services.AddScoped<IRecordRepository,RecordRepository>();
builder.Services.AddScoped<IFolderRepository,FolderRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
//___________-
builder.Services.AddDbContext<DataContext>();
builder.Services.AddHttpClient();
//builder.Services.AddDbContext<DataContext>(options =>
//       options.UseMySql(builder.Configuration.GetConnectionString("RecordsDB"), new MySqlServerVersion(new Version(8, 0, 21))));

//builder.Services.AddSingleton<DataContext>();

//mapping
builder.Services.AddAutoMapper(typeof(MappingProfile),typeof(MappingProfilePostModel));

//jwt
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            ValidAudience = builder.Configuration["JWT:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});
//public void ConfigureServices(IServiceCollection services)
//{
//    // Other service registrations

//    services.AddAWSService<IAmazonS3>();
//}

var app = builder.Build();
//check for files
app.UseStaticFiles();
//---ruti shtraicer
app.UseCors("AllowAllOrigins");
builder.Services.AddEndpointsApiExplorer();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.MapOpenApi();
   // almost i dont need it but need ensure
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });
}






app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<MyMiddleWare>();
app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapGet("/", async context =>
    {
        await context.Response.WriteAsync("Hello World!");
    });
});
app.MapControllers();

app.Run();
