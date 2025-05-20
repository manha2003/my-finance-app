using Microsoft.AspNetCore.Mvc;
using BusinessLogicLayer.Services;
using BusinessLogicLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLogicLayer.Services.BudgetService;
using Microsoft.AspNetCore.Authorization;
using DataAccessLayer.Models;
using System.Security.Claims;

namespace PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BudgetController : ControllerBase
    {
        private readonly IBudgetService _budgetService;

        public BudgetController(IBudgetService budgetService)
        {
            _budgetService = budgetService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateBudget([FromBody] BudgetAddDto budgetAddDto, [FromQuery] Guid userId)
        {
            try
            {
               
                await _budgetService.CreateBudgetAsync(budgetAddDto, userId);
                return Ok($"Budget {budgetAddDto.Name} Added successfully");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }

            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpPost("Import")]
        public async Task<IActionResult> ImportExpensesIncomes(Guid userId,int budgetId, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("File not provided.");
            }

          

            try
            {
                await _budgetService.ImportExpensesIncomesAsync(file, userId, budgetId);
                return Ok("Expenses and incomes imported successfully.");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetBudgetById(int id)
        {
            try
            {
                var budget = await _budgetService.GetBudgetByIdAsync(id);
                return Ok(budget);

            }
            catch (InvalidOperationException ex)
            { 
                return BadRequest(ex.Message);
            }
            catch(Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpGet("User/{userId}")]
        public async Task<IActionResult> GetBudgetsByUserId(Guid userId)
        {
            try
            {
                var budgets = await _budgetService.GetBudgetsByUserIdAsync(userId);
                return Ok(budgets);

            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpGet("Avaiable/User/{userId}")]
        public async Task<IActionResult> GetBudgetsAvaiableByUserId(Guid userId)
        {
            try
            {
                var budgets = await _budgetService.GetBudgetsAvaiableByUserIdAsync(userId);
                return Ok(budgets);

            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpPut("{budgetId}")]
        public async Task<IActionResult> UpdateBudget(int budgetId, [FromBody] BudgetUpdateDto budgetUpdateDto, [FromQuery] Guid userId)
        {

            try
            {
                await _budgetService.UpdateBudgetAsync(budgetId, budgetUpdateDto, userId);
                return Ok("Budget updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBudget(int id)
        {
            try
            {
                await _budgetService.DeleteBudgetAsync(id);
                return NoContent(); 
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);

            }
            catch (Exception ex)
            {
            
                return StatusCode(500, "An unexpected error occurred while deleting the budget.");
            }
        }

    }
}