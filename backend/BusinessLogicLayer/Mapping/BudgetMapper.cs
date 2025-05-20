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
    public class BudgetMapperProfiles : Profile
    {
        public BudgetMapperProfiles()
        {
            CreateMap<BudgetAddDto, Budget>()
            
            .ForMember(dest => dest.UserId, opt => opt.Ignore())
            .ForMember(dest => dest.BudgetId, opt => opt.Ignore())
            .ForMember(dest => dest.User, opt => opt.Ignore())
            .ForMember(dest => dest.Expenses, opt => opt.Ignore())
            .ForMember(dest => dest.Incomes, opt => opt.Ignore())
            .ForMember(dest => dest.WalletId, opt => opt.Condition(src => src.WalletId.HasValue));

            CreateMap<Budget, BudgetDetailsDto>()
            
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.TotalAmount, opt => opt.MapFrom(src => src.TotalAmount))
            .ForMember(dest => dest.MoneySpent, opt => opt.MapFrom(src => src.MoneySpent))
            .ForMember(dest => dest.Expenses, opt => opt.MapFrom(src => src.Expenses))
            .ForMember(dest => dest.Incomes, opt => opt.MapFrom(src => src.Incomes))
            .ForMember(dest => dest.DaysLeft, opt => opt.MapFrom(src =>(src.EndTime - src.StartTime).Days));
            CreateMap<Budget, BudgetUserDto>()
            .ForMember(dest => dest.BudgetId, opt => opt.MapFrom(src => src.BudgetId))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.TotalAmount, opt => opt.MapFrom(src => src.TotalAmount))
            .ForMember(dest => dest.MoneySpent, opt => opt.MapFrom(src => src.MoneySpent))
            .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartTime.ToString("dd-MM-yyyy")))
            .ForMember(dest => dest.ClosureDate, opt => opt.MapFrom(src => src.EndTime.ToString("dd-MM-yyyy")))
            .ForMember(dest => dest.WalletName, opt => opt.MapFrom(src => src.Wallet.Name));




        }
    }
}
