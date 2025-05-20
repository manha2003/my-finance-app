using System;
using AutoMapper;
using DataAccessLayer.Models;
using System.Collections.Generic;
using System.Linq;
using BusinessLogicLayer.Dtos;
using System.Text;
using System.Threading.Tasks;


namespace BusinessLogicLayer.Mapping
{
       
    public class UserMapperProfiles : Profile
    {
        public UserMapperProfiles()
        {
            CreateMap<User, UserAddDto>().ReverseMap()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.Password))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email));
            CreateMap<User, UserDetailsDto>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src =>src.Username))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email));
            CreateMap<User, UserDto>().ReverseMap();

        }
    }

}
