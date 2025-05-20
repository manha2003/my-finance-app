using BusinessLogicLayer.Dtos;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services.BudgetService
{
    public interface IBudgetService
    {
        Task<BudgetDetailsDto> GetBudgetByIdAsync(int id);
        Task CreateBudgetAsync(BudgetAddDto budgetAddDto, Guid userId);
        Task UpdateBudgetAsync(int budgetId, BudgetUpdateDto budgetUpdateDto, Guid userId);
        Task<IEnumerable<BudgetUserDto>> GetBudgetsAvaiableByUserIdAsync(Guid userId);
        Task ImportExpensesIncomesAsync(IFormFile file, Guid userId, int budgetId);
        Task<IEnumerable<BudgetUserDto>> GetBudgetsByUserIdAsync(Guid userId);
        Task DeleteBudgetAsync(int id);
    }
}
