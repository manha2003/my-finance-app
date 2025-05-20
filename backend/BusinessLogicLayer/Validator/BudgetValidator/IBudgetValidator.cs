using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Validator.BudgetValidator
{
    public interface IBudgetValidator
    {
        bool ValidateDate(string startDate, string endDate, out string errorMessage, out DateTime entryDate, out DateTime closureDate);
    }
}
