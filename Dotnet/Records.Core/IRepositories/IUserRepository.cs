using Records.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Core.IRepositories
{
    public interface IUserRepository
    {
        public Task<IEnumerable<UserEntity>> GetListAsync();
        public Task<UserEntity> GetByIdAsync(int id);
        public Task<UserEntity> AddAsync(UserEntity user);
        public Task<UserEntity> UpdateAsync(int id, UserEntity user);
        public Task<bool> DeleteAsync(int id);
        public Task<UserEntity> GetUserByNameAsync(string username);

    }
}
