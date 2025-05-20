using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.IncomeRepository
{
    public class IncomeRepository : IIncomeRepository
    {
        private readonly OnlineExpenseTrackingDbContext _context;

        public IncomeRepository(OnlineExpenseTrackingDbContext context)
        {
            _context = context;
        }

        public async Task<Income> GetIncomeByIdAsync(int incomeId)
        {
            return await _context.Incomes
                .Include(i => i.Budget)
                .Include(i => i.Category)
                .Include(i => i.Transaction)
                .FirstOrDefaultAsync(i => i.IncomeId == incomeId);
        }

        public async Task<IEnumerable<Income>> GetAllIncomesByUserIdAsync(Guid userId)
        {
            return await _context.Incomes.Where(i => i.UserId == userId)
                .Include(i => i.Category)
                .ToListAsync();
        }

        public async Task<IEnumerable<Income>> GetIncomesByBudgetIdAsync(int budgetId)
        {
            return await _context.Incomes
                .Where(i => i.BudgetId == budgetId)
                .Include(i => i.Budget)
                .Include(i => i.Category)
                .Include(i => i.Transaction)
                .ToListAsync();
        }

        public async Task<IEnumerable<Income>> GetIncomesByUserIdAsync(Guid userId)
        {
            return await _context.Incomes
                .Where(i => i.Budget.UserId == userId) 
                .Include(i => i.Category)
                .Include(i => i.Transaction)
                .ToListAsync();
        }

        public async Task AddIncomeAsync(Income income)
        {
            await _context.Incomes.AddAsync(income);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateIncomeAsync(Income income)
        {
             _context.Incomes.Update(income);
            await _context.SaveChangesAsync();
        }

        public async Task<Income> GetLatestIncomeAddedByUserAsync(Guid userId)
        {
            return await _context.Incomes
                .Where(i => i.Budget.UserId == userId)
                .OrderByDescending(i => i.Date)
                .FirstOrDefaultAsync();
        }

        public async Task DeleteIncomeAsync(int incomeId)
        {
            var income = await GetIncomeByIdAsync(incomeId);
            if (income != null)
            {
                _context.Incomes.Remove(income);
                await _context.SaveChangesAsync();
            }
        }

       
    }
}
