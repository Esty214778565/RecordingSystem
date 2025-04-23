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
    public class FolderService : IFolderService
    {
        private readonly IFolderRepository _folderRepository;
        private readonly IMapper _mapper;

        public FolderService(IFolderRepository folderRepository, IMapper mapper)
        {
            _folderRepository = folderRepository;
            _mapper = mapper;
        }

        public async Task<FolderDto> GetByIdAsync(int id)
        {
            var folder = await _folderRepository.GetByIdAsync(id);
            return _mapper.Map<FolderDto>(folder);
        }

        public async Task<IEnumerable<FolderDto>> GetAllAsync()
        {
            var list = await _folderRepository.GetListAsync();
            var listDto = _mapper.Map<IEnumerable<FolderDto>>(list);
            return listDto.ToList();
        }

        public async Task<FolderDto> AddAsync(FolderDto folder)
        {
            if (await _folderRepository.GetByIdAsync(folder.Id) != null)
                return null;
            var result = await _folderRepository.AddAsync(_mapper.Map<FolderEntity>(folder));

            return _mapper.Map<FolderDto>(result);
        }

        public async Task<FolderDto> UpdateAsync(int id, FolderDto folder)
        {
            if (await _folderRepository.GetByIdAsync(id) == null)
                return null;
            var result = await _folderRepository.UpdateAsync(id, _mapper.Map<FolderEntity>(folder));
            return _mapper.Map<FolderDto>(result);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            if (await _folderRepository.GetByIdAsync(id) == null)
                return false;
            return await _folderRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<FolderDto>> GetListKategoryAsync()
        {
            var list = await _folderRepository.GetListKategoryAsync();
            var listDto = _mapper.Map<IEnumerable<FolderDto>>(list);
            return listDto.ToList();
        }

        public async Task<IEnumerable<FolderDto>> GetListByParentIdAsync(int id)
        {
            var list = await _folderRepository.GetListByParentIdAsync(id);
            var listDto = _mapper.Map<IEnumerable<FolderDto>>(list);
            return listDto.ToList();
        }
    }
}
