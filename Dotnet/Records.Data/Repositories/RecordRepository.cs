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
    public class RecordRepository : IRecordRepository
    {
        private readonly DataContext _context;
        public RecordRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<RecordEntity>> GetListAsync()
        {
            return await _context.Records.ToListAsync();
            //return _context.Records.Include(r=>r.User).ToList();
        }
        public async Task<RecordEntity> GetByIdAsync(int id)
        {
            return await _context.Records.FindAsync(id);
        }
        public async Task<RecordEntity> AddAsync(RecordEntity record)
        {
            _context.Records.Add(record);
           await _context.SaveChangesAsync();
            return record;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var r = _context.Records.ToList().Find(r => r.Id == id);
            if(r == null)
            {
                return false;
            }
            _context.Records.Remove(r);
           var res=await   _context.SaveChangesAsync();
            return res>0;
        }

        public async Task<RecordEntity> UpdateAsync(int id, RecordEntity record)
        {
            var existingRecord = await _context.Records.FindAsync(id);
            if (existingRecord == null)
                return null;
            existingRecord.S3Key = record.S3Key;
            existingRecord.FileName = record.FileName;
            existingRecord.size = record.size;
            existingRecord.FileType = record.FileType;
            existingRecord.IsDeleted = record.IsDeleted;
            existingRecord.UpdateDate = DateTime.Now;
            existingRecord.Tags = record.Tags;
            await _context.SaveChangesAsync();
            return existingRecord;
        }
    }
}
