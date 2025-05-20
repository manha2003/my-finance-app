using AutoMapper;
using BusinessLogicLayer.Dtos;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.ReminderRepository;
using DataAccessLayer.Repositories.UserRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services.ReminderService
{
    public class ReminderService : IReminderService
    {
        private readonly IReminderRepository _reminderRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public ReminderService(IReminderRepository reminderRepository,IUserRepository userRepository, IMapper mapper)
        {
            _reminderRepository = reminderRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReminderDto>> GetRemindersByUserIdAsync(Guid userId)
        {
            var reminders = await _reminderRepository.GetRemindersByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<ReminderDto>>(reminders);
        }

        public async Task<ReminderDto> GetReminderByIdAsync(int reminderId)
        {
            var reminder = await _reminderRepository.GetReminderByIdAsync(reminderId);
            if (reminder == null)
            {
                throw new KeyNotFoundException($"Reminder with ID {reminderId} not found.");
            }
            return _mapper.Map<ReminderDto>(reminder);
        }

        public async Task AddReminderAsync(ReminderAddDto reminderAddDto, Guid userId)
        {
            if (reminderAddDto.ReminderDate < DateTime.UtcNow)
            {
                throw new InvalidOperationException("Reminder date cannot be in the past.");

            }
            var reminder = _mapper.Map<Reminder>(reminderAddDto);
            var user = await _userRepository.GetByUserIdAsync(userId);
            reminder.Email = user.Email;
            reminder.IsSend = false;
            reminder.UserId = userId;
            await _reminderRepository.AddReminderAsync(reminder);
            
        }

        public async Task DeleteReminderAsync(int reminderId)
        {
            var reminder = await _reminderRepository.GetReminderByIdAsync(reminderId);
            if (reminder == null)
            {
                throw new KeyNotFoundException($"Reminder with ID {reminderId} not found.");
            }
            await _reminderRepository.DeleteReminderAsync(reminder);
            
        }
    }
}
