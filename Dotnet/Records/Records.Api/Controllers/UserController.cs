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
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }
        // GET: api/<UserController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> Get()
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetById(int id)
        {
            if (id < 0)
                return BadRequest();
            var result = await _userService.GetByIdAsync(id);
            return result == null ? NotFound() : Ok(result);
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<ActionResult<UserDto>> Post([FromBody] UserPostModel user)
        {
            if (user == null)
                return BadRequest();
            var res = await _userService.AddAsync(_mapper.Map<UserDto>(user));
            if (res == null)
                return BadRequest();
            return Ok(res);
        }

        // PUT api/<UserController>/5

        [HttpPut("{id}")]
        public async Task<ActionResult<UserDto>> Put(int id, [FromBody] UserPostModel user)
        {
            var res = await _userService.UpdateAsync(id, _mapper.Map<UserDto>(user));
            if (res == null)
                return BadRequest();
            return Ok(res);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return await _userService.DeleteAsync(id) ? Ok(true) : NotFound();
        }
    }
}
