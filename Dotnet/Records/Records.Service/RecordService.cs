using AutoMapper;
using Records.Core.DTOs;
using Records.Core.Entities;
using Records.Core.IRepositories;
using Records.Core.Iservices;
using Records.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace Records.Service
{
    public class RecordService:IRecordService
    {
        private readonly IRecordRepository _recordRepository;
        private readonly IMapper _mapper;
        public RecordService(IRecordRepository recordRepository,IMapper mapper)
        {
            _recordRepository = recordRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<RecordDto>> GetAllAsync()
        {  
            var list=await _recordRepository.GetListAsync();
            var listDto=_mapper.Map<IEnumerable<RecordDto>>(list);   
            return listDto.ToList();
        }
        public async Task<RecordDto> GetByIdAsync(int id)
        {         
            var record=await _recordRepository.GetByIdAsync(id);
            return _mapper.Map<RecordDto>(record);
        }
        public async Task<RecordDto> AddAsync(RecordDto record)
        {
            if (await _recordRepository.GetByIdAsync(record.Id) != null)
                return null;
            record.CreateDate = DateTime.Now;
            record.UpdateDate = DateTime.Now;
            var addedRecord = await _recordRepository.AddAsync(_mapper.Map<RecordEntity>(record));
            return _mapper.Map<RecordDto>(addedRecord);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            if(await _recordRepository.GetByIdAsync(id) == null)
                return false;
            return await _recordRepository.DeleteAsync(id);
        }

        public async Task<RecordDto> UpdateAsync(int id, RecordDto record)
        {
            if (await _recordRepository.GetByIdAsync(id) == null)
                return null;
            record.UpdateDate = DateTime.Now;
            var updatedRecord = await _recordRepository.UpdateAsync(id, _mapper.Map<RecordEntity>(record));
            return _mapper.Map<RecordDto>(updatedRecord);
        }
    }
}
