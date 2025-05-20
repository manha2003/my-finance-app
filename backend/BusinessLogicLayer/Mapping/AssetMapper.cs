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
    public class AssetMapperProfiles : Profile
    {
        public AssetMapperProfiles()
        {
            CreateMap<AssetDto, Asset>()
               .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount))
               .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.CategoryId))
               .ForMember(dest => dest.WalletId, opt => opt.MapFrom(src => src.WalletId))
               .ForMember(dest => dest.Transaction, opt => opt.Ignore())
               .ForMember(dest => dest.AssetId, opt => opt.Ignore());
            CreateMap<AssetWalletDto, Asset>().ReverseMap();

            CreateMap<Asset, AssetUserDto>()
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Transaction != null ? src.Transaction.Description : string.Empty));
        }
    }
}
