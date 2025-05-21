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
            return await _context.Records
                .Include(r => r.Questions)
                    .ThenInclude(q => q.Answers) // Include related answers for each question  
                .ToListAsync();
        }
        public async Task<RecordEntity> GetByIdAsync(int id)
        {
            return await _context.Records
                .Include(r => r.Questions)
                    .ThenInclude(q => q.Answers) // Include related answers for each question  
                .FirstOrDefaultAsync(r => r.Id == id);
        }
        public async Task<RecordEntity> AddAsync(RecordEntity record)
        {
            if (record.FolderId > 0)
            {
                var folder = await _context.Folders.FindAsync(record.FolderId);
                if (folder != null)
                {
                    folder.UpdateDate = DateTime.Now;
                    if (folder.ParentFolderId >0)
                    {
                        var parentFolder = await _context.Folders.FindAsync(folder.ParentFolderId);
                    if(parentFolder != null)
                        folder.ParentFolder.UpdateDate = DateTime.Now; // Ensure ParentFolder is not null before updating  
                    }
                }
            }
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
            var res = await _context.SaveChangesAsync();

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

        //public async Task<RecordEntity> UpdateAsync(int id, RecordEntity record)
        //{
        //    var existingRecord = await _context.Records
        //        .Include(r => r.Questions).ThenInclude(f=>f.Answers)
        //        // Include related questions  
        //        .FirstOrDefaultAsync(r => r.Id == id);
        //    if (existingRecord == null)
        //        return null!; // Use null-forgiving operator to suppress CS8603 warning  

        //    if (!string.IsNullOrEmpty(record.S3Key))
        //        existingRecord.S3Key = record.S3Key;
        //    if (!string.IsNullOrEmpty(record.FileName))
        //        existingRecord.FileName = record.FileName;
        //    if (!string.IsNullOrEmpty(record.Description))
        //        existingRecord.Description = record.Description;
        //    if (record.Size != 0)
        //        existingRecord.Size = record.Size;
        //    if (!string.IsNullOrEmpty(record.FileType))
        //        existingRecord.FileType = record.FileType;
        //    if (record.IsDeleted != existingRecord.IsDeleted)
        //        existingRecord.IsDeleted = record.IsDeleted;

        //    existingRecord.UpdateDate = DateTime.Now;

        //    if (record.Folder != null)
        //    {
        //        existingRecord.Folder = record.Folder;
        //    }

        //    if (record.FolderId != 0)
        //    {
        //        existingRecord.FolderId = record.FolderId;
        //        var folder = await _context.Folders.FindAsync(record.FolderId);
        //        if (folder != null)
        //        {
        //            folder.UpdateDate = DateTime.Now;
        //            if (folder.ParentFolderId > 0)
        //            {
        //                var parentFolder = await _context.Folders.FindAsync(folder.ParentFolderId);
        //                if (parentFolder != null)
        //                    folder.ParentFolder.UpdateDate = DateTime.Now; // Ensure ParentFolder is not null before updating  
        //            }
        //        }
        //    }

        //    // Update questions if provided  
        //    if (record.Questions != null && record.Questions.Any())
        //    {
        //        existingRecord.Questions.Clear();
        //        foreach (var question in record.Questions)
        //        {
        //            existingRecord.Questions.Add(question);
        //        }
        //    }

        //    await _context.SaveChangesAsync();
        //    return existingRecord;
        //}

        public async Task<RecordEntity> UpdateAsync(int id, RecordEntity record)
        {
            var existingRecord = await _context.Records
                .Include(r => r.Questions)
                    .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (existingRecord == null)
                return null!;

            if (!string.IsNullOrEmpty(record.S3Key))
                existingRecord.S3Key = record.S3Key;
            if (!string.IsNullOrEmpty(record.FileName))
                existingRecord.FileName = record.FileName;
            if (!string.IsNullOrEmpty(record.Description))
                existingRecord.Description = record.Description;
            if (record.Size != 0)
                existingRecord.Size = record.Size;
            if (!string.IsNullOrEmpty(record.FileType))
                existingRecord.FileType = record.FileType;
            if (record.IsDeleted != existingRecord.IsDeleted)
                existingRecord.IsDeleted = record.IsDeleted;

            existingRecord.UpdateDate = DateTime.Now;

            if (record.Folder != null)
            {
                existingRecord.Folder = record.Folder;
            }

            if (record.FolderId != 0)
            {
                existingRecord.FolderId = record.FolderId;
                var folder = await _context.Folders.FindAsync(record.FolderId);
                if (folder != null)
                {
                    folder.UpdateDate = DateTime.Now;
                    if (folder.ParentFolderId > 0)
                    {
                        var parentFolder = await _context.Folders.FindAsync(folder.ParentFolderId);
                        if (parentFolder != null)
                            folder.ParentFolder.UpdateDate = DateTime.Now;
                    }
                }
            }

            // Update questions and answers safely
            if (record.Questions != null)
            {
                // Remove questions not in the new list
                var questionIds = record.Questions.Select(q => q.Id).ToList();
                var questionsToRemove = existingRecord.Questions.Where(q => !questionIds.Contains(q.Id)).ToList();
                foreach (var q in questionsToRemove)
                    existingRecord.Questions.Remove(q);

                foreach (var updatedQuestion in record.Questions)
                {
                    var existingQuestion = existingRecord.Questions.FirstOrDefault(q => q.Id == updatedQuestion.Id);
                    if (existingQuestion != null)
                    {
                        existingQuestion.Text = updatedQuestion.Text;

                        // Update answers
                        var answerIds = updatedQuestion.Answers?.Select(a => a.Id).ToList() ?? new List<int>();
                        var answersToRemove = existingQuestion.Answers.Where(a => !answerIds.Contains(a.Id)).ToList();
                        foreach (var a in answersToRemove)
                            existingQuestion.Answers.Remove(a);

                        if (updatedQuestion.Answers != null)
                        {
                            foreach (var updatedAnswer in updatedQuestion.Answers)
                            {
                                var existingAnswer = existingQuestion.Answers.FirstOrDefault(a => a.Id == updatedAnswer.Id);
                                if (existingAnswer != null)
                                {
                                    existingAnswer.Text = updatedAnswer.Text;
                                }
                                else
                                {
                                    // Attach new answer
                                    existingQuestion.Answers.Add(new Answer
                                    {
                                        Text = updatedAnswer.Text,
                                        QuestionId = existingQuestion.Id
                                    });
                                }
                            }
                        }
                    }
                    else
                    {
                        // Attach new question and its answers
                        var newQuestion = new Question
                        {
                            Text = updatedQuestion.Text,
                            RecordEntityId = existingRecord.Id,
                            Answers = updatedQuestion.Answers?.Select(a => new Answer
                            {
                                Text = a.Text
                            }).ToList() ?? new List<Answer>()
                        };
                        existingRecord.Questions.Add(newQuestion);
                    }
                }
            }

            await _context.SaveChangesAsync();
            return existingRecord;
        }

    }
}
