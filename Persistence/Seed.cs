using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public static class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    UserName = "test@test.com",
                    Surname = "Иванов",
                    Name = "Иван",
                    Patronymic = "Иванович",
                    Email = "test@test.com"
                };
                
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}
