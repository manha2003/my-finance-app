using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.BudgetRepository
{
    public class BudgetRepository : IBudgetRepository
    {
        private readonly OnlineExpenseTrackingDbContext _context;

        public BudgetRepository(OnlineExpenseTrackingDbContext context)
        {
            _context = context;
        }

        public async Task<Budget> GetBudgetByIdAsync(int id)
        {
            return await _context.Budgets
                .Include(b => b.Expenses)
                .Include(b => b.Incomes)
                .FirstOrDefaultAsync(b => b.BudgetId == id);
        }

        public async Task<IEnumerable<Budget>> GetBudgetsByUserIdAsync(Guid userId)
        {
            return await _context.Budgets
                .Where(b => b.UserId == userId)
                .Include(b => b.Expenses)
                .Include(b => b.Incomes)
                .Include(b=> b.Wallet)
                .ToListAsync();
        }

        public async Task<IEnumerable<Budget>> GetBudgetsAvaiableByUserId(Guid userId)
        {
            return await _context.Budgets
                .Where(b => b.UserId == userId)
                .Where(b => b.StartTime < DateTime.UtcNow)
                .Where(b => b.EndTime > DateTime.UtcNow)
                .ToListAsync();

        }


        public async Task AddBudgetAsync(Budget budget)
        {
           _context.Budgets.AddAsync(budget);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBudgetAsync(Budget budget)
        {
            _context.Budgets.Update(budget);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBudgetAsync(int id)
        {
            var budget = await GetBudgetByIdAsync(id);
            if (budget != null)
            {
                _context.Budgets.Remove(budget);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Budget>> GetBudgetsByWalletIdAsync(Guid walletId)
        {
           
           return await _context.Budgets
                .Where(b => b.WalletId == walletId)
                .ToListAsync();
              
        }

        public string GetStatus(Budget budget)
        {
            if (DateTime.Now < budget.StartTime)
                return "Future";
            if (DateTime.Now >= budget.StartTime && DateTime.Now <= budget.EndTime && budget.MoneySpent > budget.TotalAmount)
                return "Exceeded";
            if (DateTime.Now >= budget.StartTime && DateTime.Now <= budget.EndTime && budget.MoneySpent < budget.TotalAmount)
                return "Active";
            return "Completed";

        }
    }
}
