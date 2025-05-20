using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Dtos
{
    public class AssetDto
    {
            public Guid UserId { get; set; }

            public Guid WalletId { get; set; }
            public int CategoryId { get; set; }
            public decimal Amount { get; set; }
            public string Description { get; set; }
        
    }
}
