using AutoMapper;
using BusinessLogicLayer.Dtos;
using BusinessLogicLayer.Services.FinancialService;
using BusinessLogicLayer.Validator.BudgetValidator;
using CsvHelper;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.BudgetRepository;
using DataAccessLayer.Repositories.UserRepository;
using DataAccessLayer.Repositories.WalletRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Formats.Asn1;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services.BudgetService
{
    public class BudgetService : IBudgetService
    {
        private readonly IBudgetRepository _budgetRepository;
        private readonly IUserRepository _userRepository;
        private readonly IBudgetValidator _budgetValidator;
        private readonly IFinancialService _financialService;
        private readonly IWalletRepository _walletRepository;
        private readonly IMapper _mapper;

        public BudgetService(IBudgetRepository budgetRepository,IFinancialService financialService, IUserRepository userRepository,IBudgetValidator budgetValidator,IWalletRepository walletRepository, IMapper mapper )
        {
            _budgetRepository = budgetRepository;
            _userRepository = userRepository;
            _budgetValidator = budgetValidator;
            _walletRepository = walletRepository;
            _financialService = financialService;
            _mapper = mapper;
        }

        public async Task<BudgetDetailsDto> GetBudgetByIdAsync(int id)
        {
            var budget = await _budgetRepository.GetBudgetByIdAsync(id);
            if (budget == null)
            {
                throw new InvalidOperationException("Budget not found.");
            }

            return _mapper.Map<BudgetDetailsDto>(budget);
        }

      
        public async Task<IEnumerable<BudgetUserDto>> GetBudgetsByUserIdAsync(Guid userId)
        {
            var user = await _userRepository.GetByUserIdAsync(userId);
            if (user == null)
            {
                throw new InvalidOperationException("User does not exist.");
            }

            var budgets = await _budgetRepository.GetBudgetsByUserIdAsync(userId);

            
            var budgetDtos = _mapper.Map<IEnumerable<BudgetUserDto>>(budgets);
            foreach ( var budgetDto in budgetDtos ) 
            {
                var statusBudget = await  _budgetRepository.GetBudgetByIdAsync(budgetDto.BudgetId);
                budgetDto.Status = _budgetRepository.GetStatus(statusBudget);
            }

            return budgetDtos;
        }

        public async Task<IEnumerable<BudgetUserDto>> GetBudgetsAvaiableByUserIdAsync(Guid userId)
        {
            var user = await _userRepository.GetByUserIdAsync(userId);
            if (user == null)
            {
                throw new InvalidOperationException("User does not exist.");
            }

            var budgets = await _budgetRepository.GetBudgetsAvaiableByUserId(userId);


            var budgetDtos = _mapper.Map<IEnumerable<BudgetUserDto>>(budgets);
            

            return budgetDtos;
        }

        public async Task CreateBudgetAsync(BudgetAddDto budgetAddDto, Guid userId)
        {

            if(!_budgetValidator.ValidateDate(budgetAddDto.StartDate, budgetAddDto.EndDate, out string errorMessage, out DateTime entryDate, out DateTime closureDate))
            {
                throw new InvalidOperationException(errorMessage);
            }
            if (entryDate < DateTime.Now)
            {
                throw new InvalidOperationException("Entry Date cannot be in the past.");
            }

            if (closureDate <= entryDate)
            {
                throw new InvalidOperationException("Closure Date must be after Entry Date.");
            }

            if (budgetAddDto.WalletId.HasValue)
            {
                var wallet = await _walletRepository.GetWalletByIdAsync(budgetAddDto.WalletId.Value);

                if (wallet == null)
                {
                    throw new InvalidOperationException("Wallet not found.");
                }

                if (budgetAddDto.TotalAmount > wallet.Value)
                {
                    throw new InvalidOperationException("Total budget amount exceeds wallet's available balance.");
                }
            }

            var budget = _mapper.Map<Budget>(budgetAddDto);
            budget.UserId = userId;
            budget.CreatedAt = DateTime.UtcNow;
            budget.StartTime = entryDate;
            budget.EndTime = closureDate;
            budget.MoneySpent = 0;
            if (budgetAddDto.WalletId.HasValue)
            {
                budget.WalletId = budgetAddDto.WalletId.Value;
              
            }
            

            await _budgetRepository.AddBudgetAsync(budget);

        }

   

        public async Task ImportExpensesIncomesAsync(IFormFile file, Guid userId, int budgetId)
        {

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (extension != ".csv")
            {
                throw new InvalidOperationException("Invalid file type. Only CSV files are allowed.");
            }


            var records = new List<FinancialDto>();

            using (var reader = new StreamReader(file.OpenReadStream()))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                records = csv.GetRecords<FinancialDto>().ToList();
            }

            foreach (var record in records)
            {
                var budget = await _budgetRepository.GetBudgetByIdAsync(budgetId);

                if (budget == null || budget.UserId != userId)
                {
                    throw new InvalidOperationException($"Budget with ID {budgetId} not found or unauthorized.");
                }

                if (record.Type.Equals("Expense", StringComparison.OrdinalIgnoreCase))
                {
                    var expenseDto = new ExpenseDto
                    {   
                        UserId = userId,
                        BudgetId = budgetId,
                        CategoryId = record.CategoryId,
                        Amount = record.Amount,
                        Description = record.Description,
                       
                    };
                    
                    await _financialService.CreateExpenseAsync(expenseDto);
                }
                else if (record.Type.Equals("Income", StringComparison.OrdinalIgnoreCase))
                {
                    var incomeDto = new IncomeDto
                    {
                        UserId = userId,
                        BudgetId = budgetId,
                        CategoryId = record.CategoryId,
                        Amount = record.Amount,
                        Description = record.Description,

                    };

                    await _financialService.CreateIncomeAsync(incomeDto);
                }
                else
                {
                    throw new InvalidOperationException("Invalid type specified. Must be 'Expense' or 'Income'.");
                }
            }

          
        }

        public async Task UpdateBudgetAsync(int budgetId, BudgetUpdateDto budgetUpdateDto, Guid userId)
        {
            
            var budget = await _budgetRepository.GetBudgetByIdAsync(budgetId);
            if (budget == null)
            {
                throw new InvalidOperationException("Budget not found.");
            }

          
            if (budget.UserId != userId)
            {
                throw new UnauthorizedAccessException("You are not authorized to update this budget.");
            }

            
            if (!_budgetValidator.ValidateDate(budgetUpdateDto.StartDate, budgetUpdateDto.ClosureDate, out string errorMessage, out DateTime entryDate, out DateTime closureDate))
            {
                throw new InvalidOperationException(errorMessage);
            }

            if (entryDate < DateTime.Now)
            {
                throw new InvalidOperationException("Start date cannot be in the past.");
            }

            if (closureDate <= entryDate)
            {
                throw new InvalidOperationException("End date must be after the start date.");
            }

            
            if (!string.IsNullOrWhiteSpace(budgetUpdateDto.Name))
            {
                budget.Name = budgetUpdateDto.Name;
            }


            if (budgetUpdateDto.TotalAmount.HasValue)
            {
                budget.TotalAmount = budgetUpdateDto.TotalAmount.Value;
            }

            budget.StartTime = entryDate;
            budget.EndTime = closureDate;
            await _budgetRepository.UpdateBudgetAsync(budget);
        }


        public async Task DeleteBudgetAsync(int id)
        {
            var budget = await _budgetRepository.GetBudgetByIdAsync(id);
            if(budget == null)
            {
                throw new InvalidOperationException("Budget does not exist.");
            }
            await _budgetRepository.DeleteBudgetAsync(id);
            
        }

        
    }
}
