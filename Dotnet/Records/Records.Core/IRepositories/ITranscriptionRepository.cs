using Records.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Core.IRepositories
{
    public interface ITranscriptionRepository
    {
        Task<RecordEntity?> GetRecordByIdAsync(int recordId);
        Task UpdateRecordAsync(RecordEntity record);
    }
}
