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
        Task<(string Token, int Id, string Role)> RegisterAsync(UserDto registration);
        Task<(string Token, int Id, string Role)> LoginAsync(string username, string password);
    }
}
