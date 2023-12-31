﻿using Domain;
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
                    UserName = "Test",
                    Surname = "Иванов",
                    Name = "Иван",
                    Patronymic = "Иванович",
                    Email = "test@test.com"
                };
                
                await userManager.CreateAsync(user, "Pa$$w0rd");

                var workCategory = new ContactCategory
                {
                    Id = new Guid(),
                    Category = "Работа",
                    CategoryOwner = user,
                    Contacts = new List<Contact>()
                };

                var familyCategory = new ContactCategory
                {
                    Id = new Guid(),
                    Category = "Семья",
                    CategoryOwner = user,
                    Contacts = new List<Contact>()
                };

                var categories = new List<ContactCategory> { workCategory, familyCategory };


                var contacts = new List<Contact>
                {
                    new Contact
                    {
                        Id = new Guid(),
                        Surname = "Николаев",
                        Name = "Николай",
                        Patronymic = "Николаевич",
                        Category = workCategory,
                        Description = "Коллега по работе",
                        ContactAddress = new Address
                        {
                            Id = new Guid(),
                            City = "Москва",
                            Venue = "Проспект Мира",
                            House = "22",
                            Flat = "44"
                        },
                        Phones = new List<Phone>
                        {
                            new Phone
                            {
                                Id = new Guid(),
                                PhoneNumber = "7(123) 456-78-99",
                                Type = "Рабочий"
                            },
                            new Phone
                            {
                                Id = new Guid(),
                                PhoneNumber = "7(555) 555-55-55",
                                Type = "Личный"
                            }
                        }
                    },
                    new Contact
                    {
                        Id = new Guid(),
                        Surname = "Сергеев",
                        Name = "Сергей",
                        Patronymic = "Сергеевич",
                        Category = familyCategory,
                        Description = "Член семьи",
                        ContactAddress = new Address
                        {
                            Id = new Guid(),
                            City = "Москва",
                            Venue = "Проспект Мира",
                            House = "22",
                            Flat = "44"
                        },
                        Phones = new List<Phone>
                        {
                            new Phone
                            {
                                Id = new Guid(),
                                PhoneNumber = "7(222) 222-22-99",
                                Type = "Рабочий"
                            },
                            new Phone
                            {
                                Id = new Guid(),
                                PhoneNumber = "7(555) 132-88-22",
                                Type = "Рабочий"
                            },
                            new Phone
                            {
                                Id = new Guid(),
                                PhoneNumber = "7(999) 879-66-42",
                                Type = "Личный"
                            }
                        }
                    }

                };

                categories[0].Contacts.Add(contacts[0]);
                categories[1].Contacts.Add(contacts[1]);

                user.Contacts = contacts;
                user.Categories = categories;

                await context.SaveChangesAsync();

            }
        }
    }
}
