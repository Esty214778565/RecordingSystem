using AutoMapper;
using Mono.TextTemplating;
using Records.Core.DTOs;
using Records.Core.Entities;
using Records.Core.IRepositories;
using Records.Core.Iservices;
using Records.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Service
{
    public class TagService : ITagService
    {
        private readonly ITagRepository _tagRepository;
        private readonly IMapper _mapper;

        public TagService(ITagRepository tagRepository, IMapper mapper)
        {
            _tagRepository = tagRepository;
            _mapper = mapper;
        }

        public async Task<TagDto> GetByIdAsync(int id)
        {
            var tag = await _tagRepository.GetByIdAsync(id);
            return _mapper.Map<TagDto>(tag);
        }

        public async Task<IEnumerable<TagDto>> GetAllAsync()
        {
            var list = await _tagRepository.GetListAsync();
            var listDto = _mapper.Map<IEnumerable<TagDto>>(list);
            return listDto.ToList();
        }

        public async Task<TagDto> AddAsync(TagDto tag)
        {
            if (await _tagRepository.GetByIdAsync(tag.Id) != null)
                return null;
            var result = await _tagRepository.AddAsync(_mapper.Map<TagEntity>(tag));
            return tag;
        }

        public async Task<TagDto> UpdateAsync(int id, TagDto tag)
        {
            if (await _tagRepository.GetByIdAsync(id) == null)
                return null;
            var result = await _tagRepository.UpdateAsync(id, _mapper.Map<TagEntity>(tag));
            return _mapper.Map<TagDto>(result);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            if (await _tagRepository.GetByIdAsync(id) == null)
                return false;
            return await _tagRepository.DeleteAsync(id);
        }
    }
}
