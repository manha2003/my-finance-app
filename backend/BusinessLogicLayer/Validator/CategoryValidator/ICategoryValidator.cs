using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Validator.CategoryValidator
{
    public interface ICategoryValidator
    {
        bool ValidateIcon(string iconName, out string errorMessage);
        bool ValidateCustomCategoryName(string categoryName, out string errorMessage);


    }
}
