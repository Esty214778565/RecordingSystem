using Records.Core.DTOs;
using Records.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Core.Iservices
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllAsync();
        Task<UserDto> GetByIdAsync(int id);
         Task<UserDto> AddAsync(UserDto user);
        Task<UserDto> UpdateAsync(int id,UserDto user);
        Task<bool> DeleteAsync(int id);
        Task<UserDto> GetUserByNameAsync(string username);
        Task<UserDto> LoginAsync(string username,string password);
    }
}
