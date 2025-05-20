using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.ReminderRepository
{
    public interface IReminderRepository
    {
        Task<IEnumerable<Reminder>> GetRemindersByUserIdAsync(Guid userId);
        Task<Reminder> GetReminderByIdAsync(int reminderId);
        Task AddReminderAsync(Reminder reminder);
        Task UpdateReminderAsync(Reminder reminder);
        Task DeleteReminderAsync(Reminder reminder);
    }
}
