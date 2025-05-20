using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Validator.FinancialValidator
{
    public interface IFinancialValidator
    {
        bool ValidateCategoryId(int categoryId, bool isCustom, string type, out string errorMessage);
    }
}
