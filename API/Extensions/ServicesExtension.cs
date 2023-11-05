using API.Services;
using Application.Contacts;
using Application.Core;
using Application.Interfaces;
using Application.User;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ServicesExtension
    {
        public static IServiceCollection AddServiceExtensions(this IServiceCollection services, IConfiguration config)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithOrigins("http://localhost:3000");
                });
            });

            services.AddScoped<TokenService>();
            services.AddAutoMapper(typeof(MappingProfile).Assembly);
            services.AddMediatR(cnf => cnf.RegisterServicesFromAssembly(typeof(CurrentProfile.Handler).Assembly));
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<ContactValidator>();

            return services;
        }
    }
}