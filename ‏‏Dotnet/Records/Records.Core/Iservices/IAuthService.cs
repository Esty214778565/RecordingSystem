using Records.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Core.Iservices
{
    public interface IAuthService
    {
        Task<(string Token, int Id, string Role, string Name)> RegisterAsync(UserDto registration);
        Task<(string Token, int Id, string Role, string Name)> LoginAsync(string username, string password);
    }
}
