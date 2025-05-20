using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.ExpenseRepository
{
    public interface IExpenseRepository
    {
        Task AddExpenseAsync(Expense expense);
        Task<Expense> GetExpenseByIdAsync(int expenseId);
        Task<IEnumerable<Expense>> GetExpensesByBudgetIdAsync(int budgetId);
        Task<IEnumerable<Expense>> GetExpensesByUserIdAsync(Guid userId);
        Task UpdateExpenseAsync(Expense expense);
        Task<IEnumerable<Expense>> GetAllExpensesByUserIdAsync(Guid userId);
        Task<Expense> GetLatestExpenseAddedByUserAsync(Guid userId);
        Task DeleteExpenseAsync(int icomeId);
    }
}
