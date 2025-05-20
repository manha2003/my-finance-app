using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Dtos
{
    public class LiabilityWalletDto
    {
        public int LiabilityId { get; set; }
        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
    }
}
