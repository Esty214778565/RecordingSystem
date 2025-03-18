using Records.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Core.IRepositories
{
    public interface ITagRepository
    {
        public Task<IEnumerable<TagEntity>> GetListAsync();
        public Task<TagEntity> GetByIdAsync(int id);
        public Task<TagEntity> AddAsync(TagEntity tag);
        public Task<TagEntity> UpdateAsync(int id,TagEntity tag);
        public Task<bool> DeleteAsync(int id);
    }
}
