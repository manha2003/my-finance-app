using BusinessLogicLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services.ReminderService
{
    public interface IReminderService
    {
        Task<IEnumerable<ReminderDto>> GetRemindersByUserIdAsync(Guid userId);
        Task<ReminderDto> GetReminderByIdAsync(int reminderId);
        Task AddReminderAsync(ReminderAddDto reminderAddDto, Guid userId);
       // Task UpdateReminderAsync(ReminderDto reminderUpdateDto);
        Task DeleteReminderAsync(int reminderId);
    }
}
