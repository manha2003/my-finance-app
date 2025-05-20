using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.CategoryRepository
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync(Guid userId);
        Task<Category> GetCategoryByIdAsync(int categoryId);
        Task AddCategoryAsync(Category category);
        Task UpdateCategoryAsync(Category category);
        Task<IEnumerable<Category>> GetCustomCategoriesAsync(Guid userId);
        Task DeleteCategoryAsync(int categoryId);
    }
}
