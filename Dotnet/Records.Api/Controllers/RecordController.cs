using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Records.Api.Models;
using Records.Core.DTOs;
using Records.Core.Entities;
using Records.Core.Iservices;
using Records.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Records.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RecordController : ControllerBase
    {
        private readonly IRecordService _recordService;
        private readonly IMapper _mapper;
        public RecordController(IRecordService recordService,IMapper mapper)
        {
            _recordService = recordService;
            _mapper = mapper;
        }
        // GET: api/<RecordController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecordDto>>> Get()
        {
            var records = await _recordService.GetAllAsync();
            return Ok(records);
        }

        // GET api/<RecordController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecordDto>> GetById(int id)
        {
            var record = await _recordService.GetByIdAsync(id);
            if (record == null)
            {
                return NotFound();
            }
            return Ok(record);
        }

        // POST api/<RecordController>
        [HttpPost]
        public async Task<ActionResult<RecordDto>> Post([FromBody] RecordPostModel record)
        {
            var res = await _recordService.AddAsync(_mapper.Map<RecordDto>(record));
            if (res == null)
                return BadRequest();
            return Ok(res);
        }

        // PUT api/<RecordController>/5
        [HttpPut]
        public async Task<ActionResult< RecordDto>> Put(int id, [FromBody] RecordPostModel record)
        {
            var res= await _recordService.UpdateAsync(id, _mapper.Map<RecordDto>(record));
            if(res==null)
                return NotFound();
            return Ok(res);

        }

        // DELETE api/<RecordController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return await _recordService.DeleteAsync(id) ? Ok(true) : NotFound();

        }
    }
}
