using BusinessLogicLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services.CategoryService
{
    public interface ICategoryService
    {
        Task AddCategoryAsync(CategoryAddDto categoryDto, Guid userId);
        Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync(Guid userId);
        Task<IEnumerable<CategoryAddDto>> GetCustomCategoriesAsync(Guid userId);
        Task DeleteCategoryAsync(int categoryId);
    }
}
