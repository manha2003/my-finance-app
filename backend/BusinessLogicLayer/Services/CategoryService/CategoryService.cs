using AutoMapper;
using BusinessLogicLayer.Dtos;
using BusinessLogicLayer.Validator.CategoryValidator;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.CategoryRepository;
using DataAccessLayer.Repositories.UserRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services.CategoryService
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IUserRepository _userRepository;
        private readonly ICategoryValidator _categoryValidator;
        private readonly IMapper _mapper;
        

        public CategoryService(ICategoryRepository categoryRepository,IUserRepository userRepository, ICategoryValidator categoryValidator, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _userRepository = userRepository;
            _categoryValidator = categoryValidator;
            _mapper = mapper;
        }

        public async Task AddCategoryAsync(CategoryAddDto categoryDto, Guid userId)
        {
            if (!_categoryValidator.ValidateIcon(categoryDto.IconName, out string errorMessage))
            {
                throw new InvalidOperationException(errorMessage);
            }

            if (!_categoryValidator.ValidateCustomCategoryName(categoryDto.CategoryName, out string categoryErrorMessage))
            {
                throw new InvalidOperationException(categoryErrorMessage);
            }

            var category = _mapper.Map<Category>(categoryDto);
            category.IsCustom = true;
            category.UserId = userId;
          
            await _categoryRepository.AddCategoryAsync(category);
        }

        public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync( Guid userId)
        {
            var user = await _userRepository.GetByUserIdAsync(userId);
            if (user == null)
            {
                throw new InvalidOperationException("User does not exist.");
            }

            var categories = await _categoryRepository.GetAllCategoriesAsync(userId);


            var categoryDtos = _mapper.Map<IEnumerable<CategoryDto>>(categories);

            return categoryDtos;
        }

        public async Task<IEnumerable<CategoryAddDto>> GetCustomCategoriesAsync(Guid userId)
        {
            var user = await _userRepository.GetByUserIdAsync(userId);
            if (user == null)
            {
                throw new InvalidOperationException("User does not exist.");
            }

            var categories = await _categoryRepository.GetCustomCategoriesAsync(userId);


            var categoryDtos = _mapper.Map<IEnumerable<CategoryAddDto>>(categories);

            return categoryDtos;
        }

            public async Task DeleteCategoryAsync(int categoryId)

        {
            var category = await _categoryRepository.GetCategoryByIdAsync(categoryId);
            if (category == null)
            {
                throw new InvalidOperationException("Category not found!.");

            }
            await _categoryRepository.DeleteCategoryAsync(category.CategoryId);
        }
    }
}
