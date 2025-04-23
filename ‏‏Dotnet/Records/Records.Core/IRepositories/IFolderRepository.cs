using Records.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Core.IRepositories
{
    public interface IFolderRepository
    {
        public Task<IEnumerable<FolderEntity>> GetListAsync();
        public Task<IEnumerable<FolderEntity>> GetListKategoryAsync();
        public Task<IEnumerable<FolderEntity>> GetListByParentIdAsync(int id);

        public Task<FolderEntity> GetByIdAsync(int id);
        public Task<FolderEntity> AddAsync(FolderEntity folder);
        public Task<FolderEntity> UpdateAsync(int id,FolderEntity folder);
        public Task<bool> DeleteAsync(int id);
    }
}
