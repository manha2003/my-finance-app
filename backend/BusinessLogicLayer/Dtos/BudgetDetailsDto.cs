using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Dtos
{
    public class BudgetDetailsDto
    {
        public string Name { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal MoneySpent { get; set; }
        public int DaysLeft { get; set; }
        public ICollection<ExpenseUserDto>? Expenses { get; set; }
        public ICollection<IncomeUserDto>? Incomes { get; set; }
    }
}
