using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Dtos
{
    public class BudgetUserDto
    {
        public int BudgetId { get; set; }
        public string Name { get; set; }
        public string StartDate { get; set; }
        public string ClosureDate { get; set; }
        public string Status { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal MoneySpent { get; set; }
        public string WalletName { get; set; }
    }
}
