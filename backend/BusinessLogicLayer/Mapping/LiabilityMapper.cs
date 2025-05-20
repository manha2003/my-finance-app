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
    public class LiabilityMapperProfiles : Profile
    {
        public LiabilityMapperProfiles()
        {
            CreateMap<LiabilityDto, Liability>()
               .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount))
               .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.CategoryId))
               .ForMember(dest => dest.WalletId, opt => opt.MapFrom(src => src.WalletId))
               .ForMember(dest => dest.Transaction, opt => opt.Ignore())
               .ForMember(dest => dest.LiabilityId, opt => opt.Ignore());

            CreateMap<LiabilityWalletDto, Liability>().ReverseMap();

            CreateMap<Liability, LiabilityUserDto>()
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Transaction != null ? src.Transaction.Description : string.Empty));
        }
    }
}

