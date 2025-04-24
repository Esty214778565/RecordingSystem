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
            // var r = _context.Records.ToList().Find(r => r.Id == id);
            // if(r == null)
            // {
            //     return false;
            // }
            // var folder = r.Folder;

            // _context.Records.Remove(r);

            //var res=await  _context.SaveChangesAsync();
            // if (folder.Records.Count == 0)
            // {
            //     var parentFolder=folder.ParentFolder;
            //     _context.Folders.Remove(folder);
            //     var res2 = await _context.SaveChangesAsync();

            // }
            // return res>0;
            var record = _context.Records.ToList().Find(r => r.Id == id);
            if (record == null) return false; // Record not found

            // Get the folderId from the record
            int folderId = record.FolderId;

            // Remove the record
            _context.Records.Remove(record);
           var res= await _context.SaveChangesAsync();

            // Check if the folder is empty
            var folder = await _context.Folders
                .Include(f => f.Records) // Include related records
                .FirstOrDefaultAsync(f => f.Id == folderId);

            // If the folder has no records left, delete the folder
            if (folder != null && !folder.Records.Any())
            {
                // Get the parent folder ID
                int parentFolderId = (int)folder.ParentFolderId;

                // Remove the folder
                _context.Folders.Remove(folder);
               await _context.SaveChangesAsync();

                // Check if any other folders have the same parent folder ID
                var hasSiblingFolders = await _context.Folders
                    .AnyAsync(f => f.ParentFolderId == parentFolderId && f.Id != folderId);

                // If no other folders exist with the same parent ID, delete the parent folder
                if (!hasSiblingFolders)
                {
                    var parentFolder = await _context.Folders.FindAsync(parentFolderId);
                    if (parentFolder != null)
                    {
                        _context.Folders.Remove(parentFolder);
                        await _context.SaveChangesAsync();
                    }
                }
            }
            return res > 0;
        }

        public async Task<RecordEntity> UpdateAsync(int id, RecordEntity record)
        {
            var existingRecord = await _context.Records.FindAsync(id);
            if (existingRecord == null)
                return null;
            if(record.S3Key!="")
            existingRecord.S3Key = record.S3Key;
            if(record.FileName!="")
            existingRecord.FileName = record.FileName;
            if(record.Description!="")
            existingRecord.Description = record.Description;
            if(record.Size!=0)
            existingRecord.Size = record.Size;
            if(record.FileType!="")
            existingRecord.FileType = record.FileType;
            if(record.IsDeleted!=existingRecord.IsDeleted)
            existingRecord.IsDeleted = record.IsDeleted;
            existingRecord.UpdateDate = DateTime.Now;
            if(record.Folder!=null)
            existingRecord.Folder = record.Folder;
            if(record.FolderId!=0)
            existingRecord.FolderId = record.FolderId;
            await _context.SaveChangesAsync();
            return existingRecord;
        }
    }
}
