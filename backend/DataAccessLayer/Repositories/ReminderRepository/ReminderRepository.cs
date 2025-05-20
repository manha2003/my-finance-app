using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.ReminderRepository
{
    public class ReminderRepository : IReminderRepository
    {
        private readonly OnlineExpenseTrackingDbContext _context;

        public ReminderRepository(OnlineExpenseTrackingDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Reminder>> GetRemindersByUserIdAsync(Guid userId)
        {
            return await _context.Reminders
                .Where(r => r.UserId == userId)
                .ToListAsync();
        }

        public async Task<Reminder> GetReminderByIdAsync(int reminderId)
        {
            return await _context.Reminders
                .FindAsync(reminderId);
        }

        public async Task AddReminderAsync(Reminder reminder)
        {
            _context.Reminders.AddAsync(reminder);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateReminderAsync(Reminder reminder)
        {
            _context.Reminders.Update(reminder);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteReminderAsync(Reminder reminder)
        {
            _context.Reminders.Remove(reminder);
            await _context.SaveChangesAsync();
        }

        
    }
}
