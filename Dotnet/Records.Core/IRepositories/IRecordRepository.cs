using Records.Core.DTOs;
using Records.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Core.IRepositories
{
    public interface IRecordRepository
    {
        public Task<IEnumerable<RecordEntity>> GetListAsync();
        public Task<RecordEntity> GetByIdAsync(int id);
        public Task<RecordEntity> AddAsync(RecordEntity record);
        public Task<RecordEntity> UpdateAsync(int id,RecordEntity record);
        public Task<bool> DeleteAsync(int id);
    }
}
