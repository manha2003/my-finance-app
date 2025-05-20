using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.BudgetRepository
{
    public interface IBudgetRepository
    {
        Task<Budget> GetBudgetByIdAsync(int id);
        Task<IEnumerable<Budget>> GetBudgetsByUserIdAsync(Guid userId);
        Task<IEnumerable<Budget>> GetBudgetsAvaiableByUserId(Guid userId);
        Task AddBudgetAsync(Budget budget);
        Task UpdateBudgetAsync(Budget budget);
        Task DeleteBudgetAsync(int id);
        Task<List<Budget>> GetBudgetsByWalletIdAsync(Guid walletId);
        string GetStatus(Budget budget);



    }
}
