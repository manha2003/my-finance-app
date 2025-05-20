using System;
using AutoMapper;
using BusinessLogicLayer.Dtos;
using DataAccessLayer.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Mapping
{
    public class ReminderMapperProfiles : Profile
    {
        public ReminderMapperProfiles()
        {
            CreateMap<ReminderAddDto, Reminder>();

            CreateMap<Reminder, ReminderDto>()
         .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
         .ForMember(dest => dest.ReminderId, opt => opt.MapFrom(src => src.ReminderId))
         .ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.Message))
         .ForMember(dest => dest.ReminderDate, opt => opt.MapFrom(src => src.ReminderDate))
         .ForMember(dest => dest.IsSend, opt => opt.MapFrom(src => src.IsSend));

        }
    }
}
