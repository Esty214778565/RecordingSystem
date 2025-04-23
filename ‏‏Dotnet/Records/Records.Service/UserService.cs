using AutoMapper;
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
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserService(IUserRepository userRepository,IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var list=await _userRepository.GetListAsync();
            var listDto=_mapper.Map<IEnumerable<UserDto>>(list);
            return listDto;
        }
        public async Task<UserDto> GetByIdAsync(int id)
        {
            var user =await _userRepository.GetByIdAsync(id);
            return _mapper.Map<UserDto>(user);
        }
        public async Task<UserDto> AddAsync(UserDto user)
        {
            if (await _userRepository.GetByIdAsync(user.Id) != null)
                return null;
            user.CreateDate = DateTime.Now;
            user.UpdateDate = DateTime.Now;      
            var addedUserEntity = await _userRepository.AddAsync(_mapper.Map<UserEntity>(user));
            var res = _mapper.Map<UserDto>(addedUserEntity);
            return res;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            if (await _userRepository.GetByIdAsync(id) == null)
                return false;
            return await _userRepository.DeleteAsync(id);
        }

        public async Task<UserDto> UpdateAsync(int id, UserDto user)
        {
            if (await _userRepository.GetByIdAsync(id) == null)
                return null;
            user.UpdateDate= DateTime.Now;
            var updateUser=await _userRepository.UpdateAsync(id, _mapper.Map<UserEntity>(user));
            var res= _mapper.Map<UserDto>(updateUser);
            return res;
        }
        public async Task<UserDto> GetUserByNameAsync(string username)
        {
            var user = await _userRepository.GetUserByNameAsync(username);
            return _mapper.Map<UserDto>(user);
        }
       public async Task<UserDto> LoginAsync(string username, string password)
        {
            var user = await _userRepository.GetUserByNameAsync(username);
            if (user == null)
                return null;
            if (user.Password != password)
                return null;
            return _mapper.Map<UserDto>(user);
        }

    }
}
