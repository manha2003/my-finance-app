using BusinessLogicLayer.Dtos;
using BusinessLogicLayer.Services;
using BusinessLogicLayer.Services.FinancialService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] 
    public class FinancialController : ControllerBase
    {
        private readonly IFinancialService _financialService;

        public FinancialController(IFinancialService financialService)
        {
            _financialService = financialService;
        }

        
        [HttpPost("Incomes")]
        public async Task<IActionResult> AddIncome([FromBody] IncomeDto incomeDto)
        {
          
            try
            {
              
                await _financialService.CreateIncomeAsync(incomeDto);
                return Ok($"Income added successfully!");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        
        [HttpGet("Incomes/{id}")]
        public async Task<IActionResult> GetIncomeById(int id)
        {
            try
            {
                var income = await _financialService.GetIncomeByIdAsync(id);
                if (income == null)
                {
                    return NotFound("Income not found.");
                }

                return Ok(income);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

     
        [HttpGet("Incomes/User/{userId}")]
        public async Task<IActionResult> GetIncomesByUserId(Guid userId)
        {
            try
            {
                var incomes = await _financialService.GetIncomesByUserIdAsync(userId);
                return Ok(incomes);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

   
        [HttpDelete("Incomes/{id}")]
        public async Task<IActionResult> DeleteIncome(int id)
        {
            try
            {
                await _financialService.DeleteIncomeAsync(id);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }


        [HttpPost("Expenses")]
        public async Task<IActionResult> AddExpense([FromBody] ExpenseDto expenseDto)
        {


            try
            {

                await _financialService.CreateExpenseAsync(expenseDto);
                return Ok($"Expense added successfully!");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }


        [HttpGet("Expenses/{id}")]
        public async Task<IActionResult> GetExpenseById(int id)
        {
            try
            {
                var expense = await _financialService.GetExpenseByIdAsync(id);
                if (expense == null)
                {
                    return NotFound("Expense not found.");
                }

                return Ok(expense);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

      
        [HttpGet("Expenses/User/{userId}")]
        public async Task<IActionResult> GetExpensesByUserId(Guid userId)
        {
            try
            {
                var expenses = await _financialService.GetExpensesByUserIdAsync(userId);
                return Ok(expenses);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        
        [HttpDelete("Expenses/{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            try
            {
                await _financialService.DeleteExpenseAsync(id);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }


        [HttpPost("Assets")]
        public async Task<IActionResult> AddAsset([FromBody] AssetDto assetDto)
        {
            try
            {

                await _financialService.CreateAssetAsync(assetDto);
                return Ok("Asset added successfully!");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpGet("Assets/User/{userId}")]
        public async Task<IActionResult> GetAssetsByUserId(Guid userId)
        {
            try
            {
                var assets = await _financialService.GetAssetsByUserIdAsync(userId);
                return Ok(assets);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpDelete("Assets/{id}")]
        public async Task<IActionResult> DeleteAsset(int id)
        {
            try
            {
                await _financialService.DeleteAssetAsync(id);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }


        [HttpPost("Liabilities")]
        public async Task<IActionResult> AddLiability([FromBody] LiabilityDto liabilityDto)
        {
            try
            {

                await _financialService.CreateLiabilityAsync(liabilityDto);
                return Ok("Liability added successfully!");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpGet("Liabilities/User/{userId}")]
        public async Task<IActionResult> GetLiabilitiesByUserId(Guid userId)
        {
            try
            {
                var liabilities = await _financialService.GetLiabilitiesByUserIdAsync(userId);
                return Ok(liabilities);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpDelete("Liabilities/{id}")]
        public async Task<IActionResult> DeleteLiability(int id)
        {
            try
            {
                await _financialService.DeleteLiabilityAsync(id);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }


        [HttpGet("Transactions/User/{userId}")]
        public async Task<IActionResult> GetTransactionsByUserId(Guid userId)
        {
            try
            {
                var transactions = await _financialService.GetTransactionsByUserIdAsync(userId);
                return Ok(transactions);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpGet("Transactions/MostRecent/WalletOrBudget/{walletId}")]
        public async Task<IActionResult> GetMostRecentTransaction(Guid walletId)
        {
            try
            {
                var transaction = await _financialService.GetMostRecentTransaction(walletId);
                if (transaction == null)
                {
                    return NotFound($"No transactions found for wallet ID {walletId}.");
                }
                return Ok(transaction);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }

        [HttpGet("Transactions/Recent/User/{userId}")]
        public async Task<IActionResult> GetRecentTransactions(Guid userId)
        {
            try
            {
                var transactions = await _financialService.GetRecentTransactionsByUserIdAsync(userId);
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred: " + ex.Message);
            }
        }

        [HttpGet("Transactions/IncomesExpenses/User/{userId}")]
        public async Task<IActionResult> GetAllExpensesIncomes(Guid userId)
        {
            try
            {
                var transactions = await _financialService.GetAllExpensesIncomesAsync(userId);
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred: " + ex.Message);
            }
        }

    }
}