using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Budget
    {
        public int BudgetId { get; set; } 
        public Guid UserId { get; set; } 
        public Guid? WalletId { get; set; }
        public string Name { get; set; } 
        public decimal TotalAmount { get; set; } 
        public decimal MoneySpent { get; set; } 
        public DateTime CreatedAt { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public User User { get; set; } 
        public Wallet? Wallet { get; set; }
        public ICollection<Expense>? Expenses { get; set; } 
        public ICollection<Income>? Incomes { get; set; } 
    }
}
