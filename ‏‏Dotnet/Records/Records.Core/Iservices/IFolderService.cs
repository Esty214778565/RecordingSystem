using Records.Core.DTOs;
using Records.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Core.Iservices
{
    public interface IFolderService
    {
        Task<IEnumerable<FolderDto>> GetAllAsync();
         Task<IEnumerable<FolderDto>> GetListKategoryAsync();
         Task<IEnumerable<FolderDto>> GetListByParentIdAsync(int id);

        Task<FolderDto> GetByIdAsync(int id);
        Task<FolderDto> AddAsync(FolderDto folder);
        Task<FolderDto> UpdateAsync(int id,FolderDto folder);
        Task<bool> DeleteAsync(int id);
    }
}
