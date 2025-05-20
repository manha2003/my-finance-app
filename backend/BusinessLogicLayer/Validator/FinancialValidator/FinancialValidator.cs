using DataAccessLayer.Repositories.UserRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Validator.FinancialValidator
{
    public class FinancialValidator : IFinancialValidator
    {
       

        public FinancialValidator()
        {
            

        }

        public bool ValidateCategoryId(int categoryId,bool isCustom, string type, out string errorMessage)
        {
            errorMessage = null;

            if (isCustom)
            {
               
                return true;
            }

           
            switch (type)
            {
                case "Expense":
                    if (categoryId < 1 || categoryId > 21)
                    {
                        errorMessage = "The Category not avaiable for Expenses!";
                        return false;
                    }
                    break;
                case "Income":
                    if (categoryId < 22 || categoryId > 32)
                    {
                        errorMessage = "The Category not avaiable for Incomes!";
                        return false;
                    }
                    break;
                case "Asset":
                    if (categoryId < 32 || categoryId > 39)
                    {
                        errorMessage = "The Category not avaiable for Assets!";
                        return false;
                    }
                    break;
                case "Liability":
                    if (categoryId < 40 || categoryId > 45)
                    {
                        errorMessage = "The Category not avaiable for Liabilities!";
                        return false;
                    }
                    break;
                default:
                    errorMessage = "Invalid transaction type.";
                    return false;
            }

            return true;
        }
    }
}
