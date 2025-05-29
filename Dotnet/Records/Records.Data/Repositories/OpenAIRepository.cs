using Amazon.S3.Model;
using Amazon.S3;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Records.Core.Entities;
using Records.Core.IRepositories;

namespace Records.Data.Repositories
{
    public class TranscriptionRepository : ITranscriptionRepository
    {
        private readonly DataContext _context;

        public TranscriptionRepository(DataContext dbContext)
        {
            _context = dbContext;
        }

        public async Task<RecordEntity?> GetRecordByIdAsync(int recordId)
        {
            return await _context.Records.FindAsync(recordId);
        }

        public async Task UpdateRecordAsync(RecordEntity record)
        {
            _context.Records.Update(record);
            await _context.SaveChangesAsync();
        }
    }

}
