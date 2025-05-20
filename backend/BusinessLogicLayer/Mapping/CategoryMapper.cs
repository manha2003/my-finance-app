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

    public class CategoryMapperProfiles : Profile
    {
        public CategoryMapperProfiles()
        {
            CreateMap<Category, CategoryAddDto>().ReverseMap()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.CategoryName))

                .ForMember(dest => dest.IconName, opt => opt.MapFrom(src => src.IconName));

            CreateMap<Category, CategoryDto>().ReverseMap()
               .ForMember(dest=> dest.CategoryId, opt => opt.MapFrom(src => src.CategoryId))
               .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.CategoryName))

               .ForMember(dest => dest.IconName, opt => opt.MapFrom(src => src.IconName));


        }
    }

}
