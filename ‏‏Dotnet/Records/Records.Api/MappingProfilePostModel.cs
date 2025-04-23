using AutoMapper;
using Records.Api.Models;
using Records.Core.DTOs;
using Records.Core.Entities;

namespace Records.Api
{
    public class MappingProfilePostModel:Profile
    {
        public MappingProfilePostModel()
        {
            CreateMap<UserDto, UserPostModel>().ReverseMap();
            CreateMap<RecordDto, RecordPostModel>().ReverseMap();
            CreateMap<FolderDto, FolderPostModel>().ReverseMap();

        }
    }
}
