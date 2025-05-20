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
    public class ExpenseMapperProfiles : Profile
    {
        public ExpenseMapperProfiles()
        {

            CreateMap<ExpenseDto, Expense>()
               .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount))
               .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
               .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.CategoryId))
               .ForMember(dest => dest.BudgetId, opt => opt.MapFrom(src => src.BudgetId))
               .ForMember(dest => dest.Transaction, opt => opt.Ignore())
               .ForMember(dest => dest.ExpenseId, opt => opt.Ignore());
            CreateMap<Expense, ExpenseUserDto>()
               
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Transaction != null ? src.Transaction.Description : string.Empty));

            CreateMap<Expense, ExpenseBudgetDto>();
        }
    }
}
