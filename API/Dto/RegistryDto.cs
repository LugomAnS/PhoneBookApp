using System.ComponentModel.DataAnnotations;

namespace API.Dto
{
    public class RegistryDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public string Name { get; set; }
        public string Patronymic { get; set; }

    }
}
