using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Dtos
{
    public class IncomeUserDto
    {
       
            public int IncomeId { get; set; }
            public int BudgetId { get; set; }
            

            public int CategoryId { get; set; }
            public decimal Amount { get; set; }
            public string Description { get; set; }
            public DateTime Date { get; set; }
         
       
    }
}
