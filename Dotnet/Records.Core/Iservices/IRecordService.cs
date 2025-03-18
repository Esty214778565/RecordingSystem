using Records.Core.DTOs;
using Records.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Core.Iservices
{
    public interface IRecordService
    {
        Task<IEnumerable<RecordDto>> GetAllAsync();
        Task<RecordDto> GetByIdAsync(int id);
        Task<RecordDto> AddAsync(RecordDto record);
        Task<RecordDto> UpdateAsync(int id, RecordDto record);
        Task<bool> DeleteAsync(int id);
    }
}
