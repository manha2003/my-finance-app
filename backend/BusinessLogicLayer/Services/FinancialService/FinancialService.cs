using AutoMapper;
using BusinessLogicLayer.Dtos;
using BusinessLogicLayer.Validator.FinancialValidator;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.AssetRepository;
using DataAccessLayer.Repositories.BudgetRepository;
using DataAccessLayer.Repositories.CategoryRepository;
using DataAccessLayer.Repositories.ExpenseRepository;
using DataAccessLayer.Repositories.IncomeRepository;
using DataAccessLayer.Repositories.LiabilityRepository;
using DataAccessLayer.Repositories.TransactionRepository;
using DataAccessLayer.Repositories.WalletRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BusinessLogicLayer.Services.FinancialService
{
    public class FinancialService : IFinancialService
    {
        private readonly IIncomeRepository _incomeRepository;
        private readonly IExpenseRepository _expenseRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IAssetRepository _assetRepository;
        private readonly IWalletRepository _walletRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IFinancialValidator _financialValidator;
        private readonly IBudgetRepository _budgetRepository;
        private readonly ILiabilityRepository _liabilityRepository;
        private readonly IMapper _mapper;

        public FinancialService(IIncomeRepository incomeRepository, IExpenseRepository expenseRepository,IAssetRepository assetRepository, ILiabilityRepository liabilityRepository, IWalletRepository walletRepository,ICategoryRepository categoryRepository,IFinancialValidator financialValidator, ITransactionRepository transactionRepository, IBudgetRepository budgetRepository, IMapper mapper)
        {
            _incomeRepository = incomeRepository;
            _expenseRepository = expenseRepository;
            _assetRepository = assetRepository;
            _liabilityRepository = liabilityRepository;
            _categoryRepository = categoryRepository;
            _financialValidator  = financialValidator;
            _transactionRepository = transactionRepository;
            _walletRepository = walletRepository;
            _budgetRepository = budgetRepository;
            _mapper = mapper;
        }

        public async Task CreateIncomeAsync(IncomeDto incomeDto)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(incomeDto.CategoryId);
            if (category == null)
            {
                throw new InvalidOperationException("Category not Avaiable!");
            }

            if (!_financialValidator.ValidateCategoryId(category.CategoryId, category.IsCustom, "Income", out string errorMessage))
            {
                throw new InvalidOperationException(errorMessage);
            }

            var income = _mapper.Map<Income>(incomeDto);
            income.Date = DateTime.Now;
            await _incomeRepository.AddIncomeAsync(income);

            var incomeAdding = await _incomeRepository.GetLatestIncomeAddedByUserAsync(incomeDto.UserId);
            var transaction = new Transaction
            {
                UserId = incomeDto.UserId,
                IncomeId = incomeAdding.IncomeId,
                Amount = incomeDto.Amount,
                Date = income.Date,
                Description = incomeDto.Description

            };

            await _transactionRepository.AddTransactionAsync(transaction);
            
            income.TransactionId = transaction.TransactionId;
            await _incomeRepository.UpdateIncomeAsync(income);


            var budget = await _budgetRepository.GetBudgetByIdAsync(incomeDto.BudgetId);

            if (budget == null)
            {
                throw new InvalidOperationException("Budget not found!");
            }

            if (income.Date < budget.StartTime)
            {
                throw new InvalidOperationException("Budget is not available currently");
            }

            if (income.Date > budget.EndTime)
            {
                throw new InvalidOperationException("Budget is not available currently");
            }

            budget.TotalAmount +=  incomeDto.Amount;
            await _budgetRepository.UpdateBudgetAsync(budget);

            if (budget.WalletId.HasValue)
            {
                var wallet = await _walletRepository.GetWalletByIdAsync(budget.WalletId.Value);
                if (wallet == null)
                {
                    throw new InvalidOperationException("Wallet not found!");
                }

                wallet.Value += incomeDto.Amount;
                await _walletRepository.UpdateWalletAsync(wallet);
            }
        }
        public async Task CreateExpenseAsync(ExpenseDto expenseDto)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(expenseDto.CategoryId);
            if (category == null)
            {
                throw new InvalidOperationException("Category not Avaiable!");
            }

            if (!_financialValidator.ValidateCategoryId(category.CategoryId, category.IsCustom, "Expense", out string errorMessage))
            {
                throw new InvalidOperationException(errorMessage);
            }

            var expense = _mapper.Map<Expense>(expenseDto);
            expense.Date = DateTime.Now;
            await _expenseRepository.AddExpenseAsync(expense);

            var expenseAdding = await _expenseRepository.GetLatestExpenseAddedByUserAsync(expenseDto.UserId);
            if (expenseAdding == null)
            {
                throw new InvalidOperationException("Failed to retrieve the latest expense added for the user.");
            }
            var transaction = new Transaction
            {
                UserId = expenseDto.UserId,
                ExpenseId = expenseAdding.ExpenseId,
                Amount = expenseDto.Amount,
                Date = expense.Date,
                Description = expenseDto.Description

            };
            await _transactionRepository.AddTransactionAsync(transaction);
            expense.TransactionId = transaction.TransactionId;
            await _expenseRepository.UpdateExpenseAsync(expense);


            var budget = await _budgetRepository.GetBudgetByIdAsync(expenseDto.BudgetId);

            if (budget == null)
            {
                throw new InvalidOperationException("Budget not found!");
            }

            if (expense.Date < budget.StartTime)
            {
                throw new InvalidOperationException("Budget is not available currently");
            }

            if (expense.Date > budget.EndTime)
            {
                throw new InvalidOperationException("Budget is not available currently");
            }
            budget.MoneySpent +=  expenseDto.Amount;
            await _budgetRepository.UpdateBudgetAsync(budget);

            if (budget.WalletId.HasValue)
            {
                var wallet = await _walletRepository.GetWalletByIdAsync(budget.WalletId.Value);
                if (wallet == null)
                {
                    throw new InvalidOperationException("Wallet not found!");
                }

                wallet.Value -= expenseDto.Amount;
                await _walletRepository.UpdateWalletAsync(wallet);
            }


        }


        public async Task CreateAssetAsync(AssetDto assetDto)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(assetDto.CategoryId);
            if (category == null)
            {
                throw new InvalidOperationException("Category not Avaiable!");
            }

            if (!_financialValidator.ValidateCategoryId(category.CategoryId, category.IsCustom, "Asset", out string errorMessage))
            {
                throw new InvalidOperationException(errorMessage);
            }

            var asset = _mapper.Map<Asset>(assetDto);
            asset.Date = DateTime.Now;
            await _assetRepository.AddAssetAsync(asset);

            var assetAdding = await _assetRepository.GetLatestAssetAddedByUserAsync(assetDto.UserId);
            var transaction = new Transaction
            {
                UserId = assetDto.UserId,
                AssetId = assetAdding.AssetId,
                Amount = assetDto.Amount,
                Date = asset.Date,
                Description = assetDto.Description

            };
            await _transactionRepository.AddTransactionAsync(transaction);
            asset.TransactionId = transaction.TransactionId;
            await _assetRepository.UpdateAssetAsync(asset);
            

            var wallet = await _walletRepository.GetWalletByIdAsync(assetDto.WalletId);
            wallet.Value += assetDto.Amount;
            await _walletRepository.UpdateWalletAsync(wallet);


        }



        public async Task CreateLiabilityAsync(LiabilityDto liabilityDto)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(liabilityDto.CategoryId);
            if (category == null)
            {
                throw new InvalidOperationException("Category not Avaiable!");
            }

            if (!_financialValidator.ValidateCategoryId(category.CategoryId, category.IsCustom, "Liability", out string errorMessage))
            {
                throw new InvalidOperationException(errorMessage);
            }


            var liability = _mapper.Map<Liability>(liabilityDto);
            liability.Date = DateTime.Now;
            await _liabilityRepository.AddLiabilityAsync(liability);

            var liabilityAdding = await _liabilityRepository.GetLatestLiabilityAddedByUserAsync(liabilityDto.UserId);
            var transaction = new Transaction
            {
                UserId = liabilityDto.UserId,
                LiabilityId = liabilityAdding.LiabilityId,
                Amount = liabilityDto.Amount,
                Date = liability.Date,
                Description = liabilityDto.Description

            };
            await _transactionRepository.AddTransactionAsync(transaction);
            liability.TransactionId = transaction.TransactionId;
            await _liabilityRepository.UpdateLiabilityAsync(liability);


            var wallet = await _walletRepository.GetWalletByIdAsync(liabilityDto.WalletId);
            wallet.Value -= liabilityDto.Amount;
            await _walletRepository.UpdateWalletAsync(wallet);


        }
        public async Task<IncomeUserDto> GetIncomeByIdAsync(int id)
        {
            var income = await _incomeRepository.GetIncomeByIdAsync(id);
            if (income == null)
            {
                throw new InvalidOperationException("Income not found.");
            }


            return _mapper.Map<IncomeUserDto>(income);
        }

        public async Task<ExpenseUserDto> GetExpenseByIdAsync(int id)
        {
            var expense = await _expenseRepository.GetExpenseByIdAsync(id);
            if (expense == null)
            {
                throw new InvalidOperationException("Expense not found.");
            }
            return _mapper.Map<ExpenseUserDto>(expense);
        }

        public async Task<AssetUserDto> GetAssetByIdAsync(int id)
        {
            var asset = await _assetRepository.GetAssetByIdAsync(id);
            if (asset == null)
            {
                throw new InvalidOperationException("Asset not found.");
            }
            return _mapper.Map<AssetUserDto>(asset);
        }

        public async Task<LiabilityUserDto> GetLiabilityByIdAsync(int id)
        {
            var liability = await _liabilityRepository.GetLiabilityByIdAsync(id);
            if (liability == null)
            {
                throw new InvalidOperationException("Liability not found.");
            }
            return _mapper.Map<LiabilityUserDto>(liability);
        }

        public async Task<IEnumerable<IncomeDto>> GetIncomesByBudgetIdAsync(int budgetId)
        {
            var incomes = await _incomeRepository.GetIncomesByBudgetIdAsync(budgetId);
            return _mapper.Map<IEnumerable<IncomeDto>>(incomes);
        }

        public async Task<IEnumerable<ExpenseDto>> GetExpensesByBudgetIdAsync(int budgetId)
        {
            var expenses = await _expenseRepository.GetExpensesByBudgetIdAsync(budgetId);
            return _mapper.Map<IEnumerable<ExpenseDto>>(expenses);
        }


        public async Task<IEnumerable<IncomeUserDto>> GetIncomesByUserIdAsync(Guid userId)
        {
            var incomes = await _incomeRepository.GetIncomesByUserIdAsync(userId);
            
            return _mapper.Map<IEnumerable<IncomeUserDto>>(incomes);
        }

        public async Task<IEnumerable<ExpenseUserDto>> GetExpensesByUserIdAsync(Guid userId)
        {
            var expenses = await _expenseRepository.GetExpensesByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<ExpenseUserDto>>(expenses);
        }

        public async Task<IEnumerable<AssetUserDto>> GetAssetsByUserIdAsync(Guid userId)
        {
            var assets = await _assetRepository.GetAssetsByUserIdAsync(userId);

            return _mapper.Map<IEnumerable<AssetUserDto>>(assets);
        }

        public async Task<IEnumerable<LiabilityUserDto>> GetLiabilitiesByUserIdAsync(Guid userId)
        {
            var liabilities = await _liabilityRepository.GetLiabilitiesByUserIdAsync(userId);

            return _mapper.Map<IEnumerable<LiabilityUserDto>>(liabilities);
        }

        public async Task<IEnumerable<TransactionDto>> GetTransactionsByUserIdAsync(Guid userId)
        {
            var transactions = await _transactionRepository.GetTransactionsByUserIdAsync(userId);


            return _mapper.Map<IEnumerable<TransactionDto>>(transactions);
        }

        public async Task DeleteIncomeAsync(int id)
        {
            var income = await _incomeRepository.GetIncomeByIdAsync(id);
            if (income == null)
            {
                throw new InvalidOperationException("Income not found.");
            }
            var budget = await _budgetRepository.GetBudgetByIdAsync(income.BudgetId);

            if (budget == null)
            {
                throw new InvalidOperationException("Budget not found!");
            }

            if (income.Date < budget.StartTime)
            {
                throw new InvalidOperationException("Budget is not available currently");
            }

            if (income.Date > budget.EndTime)
            {
                throw new InvalidOperationException("Budget is not available currently");
            }

            budget.TotalAmount -= income.Amount;
            await _budgetRepository.UpdateBudgetAsync(budget);

            if (budget.WalletId.HasValue)
            {
                var wallet = await _walletRepository.GetWalletByIdAsync(budget.WalletId.Value);
                if (wallet == null)
                {
                    throw new InvalidOperationException("Wallet not found!");
                }

                wallet.Value -= income.Amount;
                await _walletRepository.UpdateWalletAsync(wallet);
            }

            if (income.TransactionId.HasValue)
            {
                await _transactionRepository.DeleteTransactionAsync(income.TransactionId.Value);
            }

            await _incomeRepository.DeleteIncomeAsync(id);
        }

        public async Task DeleteExpenseAsync(int id)
        {
            var expense = await _expenseRepository.GetExpenseByIdAsync(id);
            if (expense == null)
            {
                throw new InvalidOperationException("Expense not found.");
            }

            var budget = await _budgetRepository.GetBudgetByIdAsync(expense.BudgetId);

            if (budget == null)
            {
                throw new InvalidOperationException("Budget not found!");
            }

            if (expense.Date < budget.StartTime)
            {
                throw new InvalidOperationException("Budget is not available currently");
            }

            if (expense.Date > budget.EndTime)
            {
                throw new InvalidOperationException("Budget is not available currently");
            }

            budget.MoneySpent -= expense.Amount;
            await _budgetRepository.UpdateBudgetAsync(budget);

            if (budget.WalletId.HasValue)
            {
                var wallet = await _walletRepository.GetWalletByIdAsync(budget.WalletId.Value);
                if (wallet == null)
                {
                    throw new InvalidOperationException("Wallet not found!");
                }

                wallet.Value += expense.Amount;
                await _walletRepository.UpdateWalletAsync(wallet);
            }

            if (expense.TransactionId.HasValue)
            {
                await _transactionRepository.DeleteTransactionAsync(expense.TransactionId.Value);
            }

            await _expenseRepository.DeleteExpenseAsync(id);
        }

        public async Task DeleteAssetAsync(int assetId)
        {
            var asset = await _assetRepository.GetAssetByIdAsync(assetId);
            if (asset == null)
            {
                throw new InvalidOperationException("Asset not found.");
            }

            var wallet = await _walletRepository.GetWalletByIdAsync(asset.WalletId);
            if (wallet == null)
            {
                throw new InvalidOperationException("Wallet not found!");
            }

            wallet.Value -= asset.Amount;

            await _assetRepository.DeleteAssetAsync(assetId);

            if (asset.TransactionId.HasValue)
            {
                await _transactionRepository.DeleteTransactionAsync(asset.TransactionId.Value);
            }

            await _walletRepository.UpdateWalletAsync(wallet);


           

        }

        public async Task DeleteLiabilityAsync(int liabilityId)
        {
            var liability = await _liabilityRepository.GetLiabilityByIdAsync(liabilityId);
            if (liability == null)
            {
                throw new InvalidOperationException("Liability not found.");
            }

            var wallet = await _walletRepository.GetWalletByIdAsync(liability.WalletId);
            if (wallet == null)
            {
                throw new InvalidOperationException("Wallet not found!");
            }

            wallet.Value += liability.Amount;

            await _liabilityRepository.DeleteLiabilityAsync(liabilityId);

            if (liability.TransactionId.HasValue)
            {
                await _transactionRepository.DeleteTransactionAsync(liability.TransactionId.Value);
            }

            await _walletRepository.UpdateWalletAsync(wallet);




        }
        public async Task<List<TransactionDto>> GetRecentTransactionsByUserIdAsync(Guid userId)
        {
            var transactions = await _transactionRepository.GetRecentTransactionsByUserIdAsync(userId);

            return _mapper.Map<List<TransactionDto>>(transactions); 
        }

        public async Task<IEnumerable<TransactionDto>> GetAllExpensesIncomesAsync(Guid userId)
        {
            var incomes = await _incomeRepository.GetAllIncomesByUserIdAsync(userId);
            var expenses = await _expenseRepository.GetAllExpensesByUserIdAsync(userId);

            var transactions = incomes.Select(i => new TransactionDto
            {
                TransactionId = i.IncomeId,
                CategoryName = i.Category.CategoryName, 
                Amount = i.Amount,
                Date = i.Date,
                Type = "Income"
            }).ToList();

            transactions.AddRange(expenses.Select(e => new TransactionDto
            {
                TransactionId = e.ExpenseId,
                CategoryName = e.Category.CategoryName,
                Amount = e.Amount,
                Date = e.Date,
                Type = "Expense"
            }));

            return transactions.OrderBy(t => t.Date).ToList();
        }


        public async Task<TransactionDto> GetMostRecentTransaction(Guid walletId)
        {
            
            var walletTransaction = await _transactionRepository.GetMostRecentWalletTransaction(walletId);

           
            var budgetTransaction = await _transactionRepository.GetMostRecentBudgetTransaction(walletId);

          
            if (walletTransaction == null) return _mapper.Map<TransactionDto>(budgetTransaction);
            if (budgetTransaction == null) return _mapper.Map<TransactionDto>(walletTransaction);

            return walletTransaction.Date > budgetTransaction.Date
                ? _mapper.Map<TransactionDto>(walletTransaction)
                : _mapper.Map<TransactionDto>(budgetTransaction);
        }

        }
    }

