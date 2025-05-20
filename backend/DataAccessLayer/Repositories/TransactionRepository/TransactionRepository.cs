using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.TransactionRepository
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly OnlineExpenseTrackingDbContext _context;

        public TransactionRepository(OnlineExpenseTrackingDbContext context)
        {
            _context = context;
        }

        public async Task AddTransactionAsync(Transaction transaction)
        {
            await _context.Transactions.AddAsync(transaction);
            await _context.SaveChangesAsync();
        }

        public async Task<Transaction> GetTransactionByIdAsync(int transactionId)
        {
            return await _context.Transactions
                .FirstOrDefaultAsync(t => t.TransactionId == transactionId);
        }

        public async Task<IEnumerable<Transaction>> GetTransactionsByUserIdAsync(Guid userId)
        {
            return await _context.Transactions
                .Include(t => t.Income).ThenInclude(i => i.Category)
                .Include(t => t.Income).ThenInclude(i => i.Budget)
                .Include(t => t.Expense).ThenInclude(e => e.Category)
                .Include(t => t.Expense).ThenInclude(e => e.Budget)
                .Include(t => t.Asset).ThenInclude(a => a.Category)
                .Include(t => t.Asset).ThenInclude(a => a.Wallet)
                .Include(t => t.Liability).ThenInclude(l => l.Category)
                .Include(t => t.Liability).ThenInclude(l => l.Wallet)
                .Where(t => t.UserId == userId)       
                .ToListAsync();
        }

        public async Task DeleteTransactionAsync(int transactionId)
        {
            var transaction = await _context.Transactions.FindAsync(transactionId);
            if (transaction != null)
            {
                _context.Transactions.Remove(transaction);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Transaction> GetMostRecentWalletTransaction(Guid walletId)
        {
            return await _context.Transactions
                .Include(t => t.Asset).ThenInclude(a => a.Category)
                .Include(t => t.Liability).ThenInclude(l => l.Category)
                .Where(t => t.AssetId != null && t.Asset.WalletId == walletId ||
                            t.LiabilityId != null && t.Liability.WalletId == walletId)
                .OrderByDescending(t => t.Date)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Transaction>> GetRecentTransactionsByUserIdAsync(Guid userId)
        {
            return await _context.Transactions
                .Include(t => t.Income).ThenInclude(i => i.Category)
                .Include(t => t.Expense).ThenInclude(e => e.Category)
                .Include(t => t.Asset).ThenInclude(a => a.Category)
                .Include(t => t.Liability).ThenInclude(l => l.Category)
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.Date)
                .Take(6)
                .ToListAsync();
        }

        public async Task<Transaction> GetMostRecentBudgetTransaction(Guid walletId)
        {
            return await _context.Transactions
                .Include(t => t.Income).ThenInclude(i => i.Category)
                .Include(t => t.Expense).ThenInclude(e => e.Category)
                .Where(t => (t.ExpenseId != null && t.Expense.Budget.WalletId == walletId) ||
                            (t.IncomeId != null && t.Income.Budget.WalletId == walletId))
                .OrderByDescending(t => t.Date)
                .FirstOrDefaultAsync();
        }

       
    }
}
