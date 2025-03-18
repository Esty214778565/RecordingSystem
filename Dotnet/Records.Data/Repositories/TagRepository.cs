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
    public class TagRepository : ITagRepository
    {
        private readonly DataContext _context;
        public TagRepository(DataContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<TagEntity>> GetListAsync()
        {
            return await _context.Tags.ToListAsync();
        }
        public async Task<TagEntity> GetByIdAsync(int id)
        {
            return await _context.Tags.FindAsync(id);
        }
        public async Task<TagEntity> AddAsync(TagEntity tag)
        {
            _context.Tags.Add(tag);
            await _context.SaveChangesAsync();
            return tag;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var t = _context.Tags.ToList().Find(t => t.Id == id);
            if (t == null)
            {
                return false;
            }
            _context.Tags.Remove(t);
            var res = await _context.SaveChangesAsync();
            return res > 0;
        }



        public async Task<TagEntity> UpdateAsync(int id, TagEntity tag)
        {
            var existingTag = await _context.Tags.FindAsync(id);
            if (existingTag == null)
                return null;
            existingTag.Name = tag.Name;
            existingTag.Records = tag.Records;
            
            await _context.SaveChangesAsync();
            return existingTag;
        }
    }
}
