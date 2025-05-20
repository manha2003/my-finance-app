using BusinessLogicLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services.FinancialService
{
    public interface IFinancialService
    {
        Task CreateIncomeAsync(IncomeDto incomeDto);
        Task CreateExpenseAsync(ExpenseDto expenseDto);
        Task CreateAssetAsync(AssetDto assetDto);
        Task CreateLiabilityAsync(LiabilityDto liabilityDto);
        Task<IncomeUserDto> GetIncomeByIdAsync(int id);
        Task<ExpenseUserDto> GetExpenseByIdAsync(int id);
        Task<IEnumerable<IncomeDto>> GetIncomesByBudgetIdAsync(int budgetId);
        Task<IEnumerable<ExpenseDto>> GetExpensesByBudgetIdAsync(int budgetId);
        Task<IEnumerable<IncomeUserDto>> GetIncomesByUserIdAsync(Guid userId);
        Task<IEnumerable<ExpenseUserDto>> GetExpensesByUserIdAsync(Guid userId);
        Task<IEnumerable<AssetUserDto>> GetAssetsByUserIdAsync(Guid userId);
        Task<IEnumerable<LiabilityUserDto>> GetLiabilitiesByUserIdAsync(Guid userId);
        Task<IEnumerable<TransactionDto>> GetTransactionsByUserIdAsync(Guid userId);
        Task DeleteIncomeAsync(int id);
        Task DeleteExpenseAsync(int id);
        Task DeleteAssetAsync(int assetId);
        Task DeleteLiabilityAsync(int liabilityId);
        Task<TransactionDto> GetMostRecentTransaction(Guid walletId);
        Task<List<TransactionDto>> GetRecentTransactionsByUserIdAsync(Guid userId);
        Task<IEnumerable<TransactionDto>> GetAllExpensesIncomesAsync(Guid userId);
    }
}
