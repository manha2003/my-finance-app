using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Dtos
{
    public class BudgetAddDto
    {
        public string Name { get; set; }
        
        public decimal TotalAmount { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public Guid? WalletId { get; set; }

    }
}
