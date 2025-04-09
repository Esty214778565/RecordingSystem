using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Records.Api.Models;
using Records.Core.DTOs;
using Records.Core.Iservices;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Records.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;

        public AuthController(IMapper mapper, IAuthService authService)
        {
            
            _mapper = mapper;
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody] LoginModel login)
        {
            try
            {
                var token = await _authService.LoginAsync(login.Name, login.Password);

                return Ok(new { Token = token.Token, Id = token.Id, Role = token.Role ,Name=token.Name});
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid credentials");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost("register")]
        public async Task<IActionResult> Post([FromBody] UserPostModel registerModel)
        {
            try
            {
                var res = _mapper.Map<UserDto>(registerModel);
                var token = await _authService.RegisterAsync(res);
                return Ok(new { Token = token.Token, Id = token.Id, Role = token.Role,Name=token.Name });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
       
    }
}
