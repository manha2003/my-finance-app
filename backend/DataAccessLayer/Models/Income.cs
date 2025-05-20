using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Income
    {
        public int IncomeId { get; set; } 
        public int BudgetId { get; set; } 
        public Guid UserId { get; set; }
        public int CategoryId { get; set; }
        public int? TransactionId { get; set; }
        public decimal Amount { get; set; } 
        public DateTime Date { get; set; } 
        

      
        public Budget Budget { get; set; } 
        public Category Category { get; set; } 
        public Transaction? Transaction { get; set; } 
    }
}
