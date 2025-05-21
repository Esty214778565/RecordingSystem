using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Records.Core.DTOs;
using Records.Core.Entities;
using Records.Core.IRepositories;
using Records.Core.Iservices;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Records.Service
{
    public class AuthService:IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository,IMapper mapper,IConfiguration configuration)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _configuration = configuration;
        }
        private (string Token, int Id, string Role, string Name) GenerateToken(int userId, string role,string name)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Role, role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(Convert.ToDouble(_configuration["Jwt:ExpiresInMinutes"])),
                signingCredentials: creds);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return (Token: tokenString, Id: userId, Role: role,Name:name);
        }

        public async Task<(string Token, int Id, string Role, string Name)> RegisterAsync(UserDto registration)
        {
            var existingUser = await _userRepository.GetUserByNameAsync(registration.Name);
            if (existingUser != null)
            {
                throw new Exception("User already exists");
            }
         var res=  await _userRepository.AddAsync(_mapper.Map<UserEntity>(registration));
            return GenerateToken(res.Id, res.Role,res.Name);
        }

        public async Task<(string Token, int Id, string Role, string Name)> LoginAsync(string username, string password)
        {
            var user = await _userRepository.GetUserByNameAsync(username);
            if (user == null || user.Password != password)
            {
                throw new UnauthorizedAccessException("Invalid credentials");
            }

            return GenerateToken(user.Id, user.Role,user.Name);
        }

   
    }
}
