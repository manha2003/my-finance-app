using AutoMapper;
using AutoMapper.Configuration.Conventions;
using BusinessLogicLayer.Dtos;
using DataAccessLayer.Models;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Mapping
{
    public class IncomeMapperProfiles : Profile
    {
        public IncomeMapperProfiles() {

            CreateMap<IncomeDto, Income>()
               .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount))
               .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
               .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.CategoryId))
               .ForMember(dest => dest.BudgetId, opt => opt.MapFrom(src => src.BudgetId))
               .ForMember(dest => dest.Transaction, opt => opt.Ignore()) 
               .ForMember(dest => dest.IncomeId, opt => opt.Ignore());

            CreateMap<Income, IncomeUserDto>()
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Transaction != null ? src.Transaction.Description : string.Empty));



            CreateMap<Income, IncomeBudgetDto>();
        }     
    }
}
