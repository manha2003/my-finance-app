using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.CategoryRepository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly OnlineExpenseTrackingDbContext _context;

        public CategoryRepository(OnlineExpenseTrackingDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync(Guid userId)
        {
            return await _context.Categories
                .Where(c => c.UserId == userId || c.UserId == null)
                .ToListAsync();
        }

        public async Task<Category> GetCategoryByIdAsync(int categoryId)
        {
            return await _context.Categories
                
                .FirstOrDefaultAsync(c => c.CategoryId == categoryId);
        }

        public async Task<IEnumerable<Category>> GetCustomCategoriesAsync(Guid userId)
        {
            return await _context.Categories
                .Where(c => c.IsCustom == true)
                .ToListAsync();
        }

        public async Task AddCategoryAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCategoryAsync(Category category)
        {
            _context.Categories.Update(category);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCategoryAsync(int categoryId)
        {
            var category = await _context.Categories.FindAsync(categoryId);
            if (category != null)
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
            }
        }
    }
}
