using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }

       
        public Guid UserId { get; set; }
        public User User { get; set; }

        
        public int? IncomeId { get; set; }
        public Income? Income { get; set; }

        public int? ExpenseId { get; set; }
        public Expense? Expense { get; set; }

        public int? AssetId { get; set; }
        public Asset? Asset { get; set; }

        public int? LiabilityId { get; set; }
        public Liability? Liability { get; set; }
    }
}
