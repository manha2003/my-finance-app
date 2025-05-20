using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Wallet
    {
        public Guid WalletId { get; set; }

        public string Name { get; set; }
        public decimal Value { get; set; }
        
        public Guid UserId { get; set; }
       
        public User User { get; set; }
        public ICollection<Budget>? Budgets { get; set; }
        public ICollection<Asset>? Assets { get; set; }     
        public ICollection<Liability>? Liabilities { get; set; }
    }
}
