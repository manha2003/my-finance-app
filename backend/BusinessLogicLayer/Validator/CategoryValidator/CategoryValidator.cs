using DataAccessLayer.Repositories.UserRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Validator.CategoryValidator
{
    public class CategoryValidator : ICategoryValidator
    {

        public CategoryValidator()
        {

        }

        string[] iconNames = new string[]
        {
            "fastfood",
            "localDrink",
            "electricBolt",
            "receipt",
            "home",
            "car",
            "grocery",
            "flight",
            "hospital",
            "school",
            "soccer",
            "theater",
            "phone",
            "wifi",
            "fitness",
            "creditCard",
            "build",
            "pet",
            "shoppingCart",
            "musicNote",
            "localBar",
            "salary",
            "freelance",
            "investment",
            "gift",
            "bonus",
            "rental",
            "savings",
            "dividend",
            "commission",
            "business",
            "realEstate",
            "car",
            "investment",
            "savings",
            "crypto",
            "gift",
            "theater",
            "shoppingCart",
            "home",
            "car",
            "creditCard",
            "school",
            "hospital",
            "savings"
        };

        public bool ValidateIcon(string iconName, out string errorMessage)
        {
            errorMessage = null;
            if (string.IsNullOrEmpty(iconName))
            {
                errorMessage = "Icon is Required";
                return false;
            }
            if (!iconNames.Contains(iconName))
            {
                errorMessage = "Icon Name must be existed as Icon";
                return false;
            }
           
            return true;
        }

        public bool ValidateCustomCategoryName(string categoryName, out string errorMessage)
        {
            errorMessage = null;

            if (string.IsNullOrWhiteSpace(categoryName))
            {
                errorMessage = "Category name cannot be empty.";
                return false;
            }
            if (categoryName.Length < 1 || categoryName.Length > 20)
            {
                errorMessage = "Category name must be between 3 and 20 characters.";
                return false;
            }

            return true;
        }
    }
}
