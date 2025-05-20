using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Dtos
{
    public class IncomeBudgetDto
    {
        public int IncomeId { get; set; }
        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
    }
}
