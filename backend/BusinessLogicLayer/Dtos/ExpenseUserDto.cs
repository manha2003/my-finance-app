using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Dtos
{
    public class ExpenseUserDto
    {
        public int ExpenseId { get; set; }
        public int BudgetId { get; set; }
       

        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }
}
