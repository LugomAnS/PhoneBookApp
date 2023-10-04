using Domain;
using Persistence;

namespace API.Extensions
{
    public static class IdentityExtension
    {
        public static IServiceCollection AddIdentityExtensions(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt =>
                {
                    opt.Password.RequireNonAlphanumeric = false;
                    opt.User.RequireUniqueEmail = true;
                })
                .AddEntityFrameworkStores<DataContext>();

            return services;
        }
    }
}
