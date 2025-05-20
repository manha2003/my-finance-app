using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Validator.BudgetValidator
{
    public class BudgetValidator : IBudgetValidator
    {
        public BudgetValidator()
        {

        }

        public bool ValidateDate(string startDate, string endDate, out string errorMessage, out DateTime entryDate, out DateTime closureDate)
        {
            errorMessage = null;
            entryDate = DateTime.MinValue; 
            closureDate = DateTime.MinValue;  

            if (string.IsNullOrEmpty(startDate) || string.IsNullOrEmpty(endDate))
            {
                errorMessage = "Start Date and End Date are required!";
                return false;
            }

            bool isEntryDateValid = DateTime.TryParseExact(
                startDate,
                "dd/MM/yyyy",
                CultureInfo.InvariantCulture, 
                DateTimeStyles.None,
                out entryDate
            );

            bool isClosureDateValid = DateTime.TryParseExact(
               endDate,
               "dd/MM/yyyy",
               CultureInfo.InvariantCulture,
               DateTimeStyles.None,
               out closureDate
           );


            if (!isEntryDateValid || !isClosureDateValid)
            {
                errorMessage = "Start Date or End Date is not in the correct format!";
                return false;
            }

            return true;
        }
    }
}
