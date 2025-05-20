using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.TransactionRepository
{
    public interface ITransactionRepository
    {
        Task AddTransactionAsync(Transaction transaction);
        Task<Transaction> GetTransactionByIdAsync(int transactionId);
        Task<IEnumerable<Transaction>> GetTransactionsByUserIdAsync(Guid userId);
        Task DeleteTransactionAsync(int transactionId);
        Task<List<Transaction>> GetRecentTransactionsByUserIdAsync(Guid userId);
        Task<Transaction> GetMostRecentWalletTransaction(Guid walletId);
        Task<Transaction> GetMostRecentBudgetTransaction(Guid walletId);

    }
}
