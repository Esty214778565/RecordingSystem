using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
    public class TagController : ControllerBase
    {
        private readonly ITagService _tagService;
        private readonly IMapper _mapper;
        public TagController(ITagService tagService,IMapper mapper)
        {
            _tagService = tagService;
            _mapper = mapper;
        }
        // GET: api/<TagController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TagDto>>> Get()
        {
            var result = await _tagService.GetAllAsync();
            return Ok(result);
        }

        // GET api/<TagController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TagDto>> GetById(int id)
        {
            if (id < 0)
                return BadRequest();
            var result =await _tagService.GetByIdAsync(id);
            return result == null ? NotFound() : Ok(result);
        }

        // POST api/<TagController>
        [HttpPost]
        public async Task<ActionResult<TagDto>> Post([FromBody] TagPostModel tag)
        {
            var res = await _tagService.AddAsync(_mapper.Map<TagDto>(tag));
            if (res == null)
                return BadRequest();
            return Ok(res);
        }

        // PUT api/<TagController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<TagDto>> Put(int id, [FromBody] TagPostModel tag)
        {
            var res = await _tagService.UpdateAsync(id, _mapper.Map<TagDto>(tag));
            if (res == null)
                return NotFound();
            return Ok(res);
        }

        // DELETE api/<TagController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var result = await _tagService.DeleteAsync(id);
            return result ? Ok(true) : NotFound();
        }
    }
}
