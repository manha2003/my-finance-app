using AutoMapper;
using BusinessLogicLayer.Dtos;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Mapping
{
    public class WalletMapperProfiles : Profile
    {
        public WalletMapperProfiles()
        {
            CreateMap<WalletAddDto, Wallet>().ReverseMap();


            CreateMap<Wallet, WalletDetailsDto>().ReverseMap()
           .ForMember(dest => dest.WalletId, opt => opt.MapFrom(src => src.WalletId))
           .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
           .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
          
           .ForMember(dest => dest.Assets, opt => opt.MapFrom(src => src.Assets))
           .ForMember(dest => dest.Liabilities, opt => opt.MapFrom(src => src.Liabilities));
        }
    }
}
