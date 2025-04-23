using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Org.BouncyCastle.Math.EC;
using Records.Core.DTOs;
using Records.Core.Entities;
using Records.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Data.Repositories
{
    public class FolderRepository : IFolderRepository
    {
        private readonly DataContext _context;
        public FolderRepository(DataContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<FolderEntity>> GetListAsync()
        {
            return await _context.Folders.Include(f=>f.Records).Include(f2=>f2.ParentFolder).ToListAsync();
        }
        public async Task<FolderEntity> GetByIdAsync(int id)
        {
            return await _context.Folders
                                 .Include(f => f.Records)
                                 .FirstOrDefaultAsync(f => f.Id == id);
        }
        public async Task<FolderEntity> AddAsync(FolderEntity folder)
        {

            if (folder.UserId == 0) {
                folder.UserId = null;
            }
            if (folder.ParentFolderId == 0)
            {
                folder.ParentFolderId = null;
            }
            _context.Folders.Add(folder);
            await _context.SaveChangesAsync();
            return folder;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var t = _context.Folders.ToList().Find(t => t.Id == id);
            if (t == null)
            {
                return false;
            }
            _context.Folders.Remove(t);
            var res = await _context.SaveChangesAsync();
            return res > 0;
        }



        public async Task<FolderEntity> UpdateAsync(int id, FolderEntity folder)
        {
            var existingFolder = await _context.Folders.FindAsync(id);
            if (existingFolder == null)
                return null;
            existingFolder.Name = folder.Name;
            existingFolder.Records = folder.Records;
            
            existingFolder.UpdateDate=DateTime.Now;
            existingFolder.User=folder.User;
            existingFolder.UserId = folder.UserId;
            existingFolder.ParentFolderId = folder.ParentFolderId;
            existingFolder.ParentFolder=folder.ParentFolder;
            existingFolder.IsDeleted = folder.IsDeleted;
            
            await _context.SaveChangesAsync();
            return existingFolder;
        }

        public async Task<IEnumerable<FolderEntity>> GetListKategoryAsync()
        {
            return await _context.Folders
                                 .Where(f => f.ParentFolderId == null)
                                 .ToListAsync();
            
        }

        public async Task<IEnumerable<FolderEntity>> GetListByParentIdAsync(int id)
        {
            return await _context.Folders
                                 .Where(f => f.ParentFolderId == id && f.ParentFolderId != null)
                                 .Include(f => f.Records)
                                 .ToListAsync();
        }
    }
}
