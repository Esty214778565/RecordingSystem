using Microsoft.EntityFrameworkCore;
using Records.Core.Entities;
using Records.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
      

        public async Task<IEnumerable<UserEntity>> GetListAsync()
        {
            return await _context.Users.Include(u=>u.Folders).ToListAsync();
          
        }
        public async Task<UserEntity> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
        public async Task<UserEntity> AddAsync(UserEntity user)
        {
            _context.Users.Add(user);
         await _context.SaveChangesAsync();
            return user;
        }
        public async Task<UserEntity> UpdateAsync(int id, UserEntity user)
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
                return null;
            existingUser.Name = user.Name;
            existingUser.Email = user.Email;
            existingUser.Password = user.Password;
            existingUser.UpdateDate = DateTime.Now;
            existingUser.Folders = user.Folders;
            existingUser.Role = user.Role;
            await _context.SaveChangesAsync();
            return existingUser;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var u = _context.Users.ToList().Find(u => u.Id == id);
            if (u == null)
            {
                return false;
            }
            _context.Users.Remove(u);
            var res = await _context.SaveChangesAsync();
            return res > 0;
        }

        public async Task<UserEntity> GetUserByNameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Name == username);
        }


    }
}
