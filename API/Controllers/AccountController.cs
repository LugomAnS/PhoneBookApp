using System.Security.Claims;
using API.Dto;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto login)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == login.Email);
            if (user == null)
                return Unauthorized();

            var check = await _userManager.CheckPasswordAsync(user, login.Password);

            if (check)
                return CreateUserDto(user);

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("registry")]
        public async Task<ActionResult<UserDto>> Registry(RegistryDto registry)
        {
            if (await _userManager.Users.AnyAsync(u => u.UserName == registry.UserName))
            {
                ModelState.AddModelError("username", "Пользователь с таким именем уже зарегистрирован");
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync(u => u.Email == registry.Email))
            {
                ModelState.AddModelError("email", "Пользователь с такой почтой уже зарегистрирован");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                UserName = registry.UserName,
                Email = registry.Email,
                Surname = registry.Surname,
                Name = registry.Name,
                Patronymic = registry.Patronymic
            };

            var result = await _userManager.CreateAsync(user, registry.Password);

            if (result.Succeeded)
            {
                return CreateUserDto(user);
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserDto(user);
        }

        private UserDto CreateUserDto(AppUser user)
        {
            return new UserDto
            {
                Surname = user.Surname,
                Name = user.Name,
                Patronymic = user.Patronymic,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName
            };
        }
    }
}
