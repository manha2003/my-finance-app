using BusinessLogicLayer.Dtos;
using BusinessLogicLayer.Services.CategoryService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpPost]
    public async Task<IActionResult> AddCategory([FromBody] CategoryAddDto categoryDto, Guid userId)
    {
        try
        {
            await _categoryService.AddCategoryAsync(categoryDto, userId);
            return Ok("Category added successfully.");

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


    [HttpGet("User/{userId}")]
    public async Task<IActionResult> GetAllCategories(Guid userId)
    {
        try
        {
            var categories = await _categoryService.GetAllCategoriesAsync(userId);
            return Ok(categories);

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

 


    [HttpGet("custom")]
    public async Task<IActionResult> GetCustomCategories(Guid userId)
    {
        try
        {
            var categories = await _categoryService.GetCustomCategoriesAsync(userId);
            return Ok(categories);

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

}