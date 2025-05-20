using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.ExpenseRepository
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly OnlineExpenseTrackingDbContext _context;

        public ExpenseRepository(OnlineExpenseTrackingDbContext context)
        {
            _context = context;
        }

        public async Task<Expense> GetExpenseByIdAsync(int expenseId)
        {
            return await _context.Expenses
                .Include(e => e.Budget)      
                .Include(e => e.Category)
                .Include(e => e.Transaction)
                .FirstOrDefaultAsync(e => e.ExpenseId == expenseId);
        }

        public async Task<IEnumerable<Expense>> GetExpensesByBudgetIdAsync(int budgetId)
        {
            return await _context.Expenses
                .Where(e => e.BudgetId == budgetId)
                .Include(e => e.Category)
                .Include(e => e.Transaction)
                .ToListAsync();
        }

        public async Task<IEnumerable<Expense>> GetExpensesByUserIdAsync(Guid userId)
        {
            return await _context.Expenses
                .Where(i => i.Budget.UserId == userId)
                .Include(i => i.Category)
                .Include(i => i.Transaction)
                .ToListAsync();
        }

        public async Task AddExpenseAsync(Expense expense)
        {
            await _context.Expenses.AddAsync(expense);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateExpenseAsync(Expense expense)
        {
            _context.Expenses.Update(expense);
            await _context.SaveChangesAsync();
        }

        public async Task<Expense> GetLatestExpenseAddedByUserAsync(Guid userId)
        {
            return await _context.Expenses
                .Where(i => i.Budget.UserId == userId)
                .OrderByDescending(i => i.Date)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Expense>> GetAllExpensesByUserIdAsync(Guid userId)
        {
            return await _context.Expenses.Where(e => e.UserId == userId)
                .Include(e => e.Category)
                .ToListAsync();
        }

        public async Task DeleteExpenseAsync(int expenseId)
        {
            var expense = await GetExpenseByIdAsync(expenseId);
            if (expense != null)
            {
                _context.Expenses.Remove(expense);
                await _context.SaveChangesAsync();
            }
        }
    }
}
