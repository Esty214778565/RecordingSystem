using AutoMapper;
using Records.Core.DTOs;
using Records.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Core
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<UserDto,UserEntity>().ReverseMap();
            CreateMap<RecordDto,RecordEntity>().ReverseMap();
            CreateMap<TagDto,TagEntity>().ReverseMap();

        }
    }
}
