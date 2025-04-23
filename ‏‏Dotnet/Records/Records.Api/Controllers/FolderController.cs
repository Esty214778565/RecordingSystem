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
    public class FolderController : ControllerBase
    {
        private readonly IFolderService _folderService;
        private readonly IMapper _mapper;
        public FolderController(IFolderService folderService,IMapper mapper)
        {
            _folderService = folderService;
            _mapper = mapper;
        }
        // GET: api/<FolderController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FolderDto>>> Get()
        {
            var result = await _folderService.GetAllAsync();
            return Ok(result);
        }

        // GET api/<FolderController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FolderDto>> GetById(int id)
        {
            if (id < 0)
                return BadRequest();
            var result =await _folderService.GetByIdAsync(id);
            return result == null ? NotFound() : Ok(result);
        }

        // POST api/<FolderController>
        [HttpPost]
        public async Task<ActionResult<FolderDto>> Post([FromBody] FolderPostModel folder)
        {
            var res = await _folderService.AddAsync(_mapper.Map<FolderDto>(folder));
            if (res == null)
                return BadRequest();
            return Ok(res);
        }

        // PUT api/<FolderController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<FolderDto>> Put(int id, [FromBody] FolderPostModel folder)
        {
            var res = await _folderService.UpdateAsync(id, _mapper.Map<FolderDto>(folder));
            if (res == null)
                return NotFound();
            return Ok(res);
        }

        // DELETE api/<FolderController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var result = await _folderService.DeleteAsync(id);
            return result ? Ok(true) : NotFound();
        }
        [HttpGet("kategories")]
        public async Task<ActionResult<IEnumerable<FolderDto>>> GetListKategory()
        {
            var result=await _folderService.GetListKategoryAsync();
            return Ok(result);
        }
        [HttpGet("children/{id}")]
        public async Task<ActionResult<IEnumerable<FolderDto>>> GetListByParentId(int id)
        {
            var result = await _folderService.GetListByParentIdAsync(id);
            return Ok(result);
        }

    }
}
