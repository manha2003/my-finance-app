using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.IncomeRepository
{
    public interface IIncomeRepository
    {
        Task AddIncomeAsync(Income income);
        Task<Income> GetIncomeByIdAsync(int incomeId);
        Task<IEnumerable<Income>> GetIncomesByBudgetIdAsync(int budgetId);
        Task<IEnumerable<Income>> GetIncomesByUserIdAsync(Guid userId);
        Task UpdateIncomeAsync(Income income);
        Task<Income> GetLatestIncomeAddedByUserAsync(Guid userId);
        Task<IEnumerable<Income>> GetAllIncomesByUserIdAsync(Guid userId);
        Task DeleteIncomeAsync(int icomeId);
    }
}
