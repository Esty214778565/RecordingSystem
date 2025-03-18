using Records.Core.DTOs;
using Records.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Core.Iservices
{
    public interface ITagService
    {
        Task<IEnumerable<TagDto>> GetAllAsync();
        Task<TagDto> GetByIdAsync(int id);
        Task<TagDto> AddAsync(TagDto tag);
        Task<TagDto> UpdateAsync(int id,TagDto tag);
        Task<bool> DeleteAsync(int id);
    }
}
