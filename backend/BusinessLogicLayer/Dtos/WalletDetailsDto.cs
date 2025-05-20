using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Dtos
{
    public class WalletDetailsDto
    {
        public Guid WalletId { get; set; }
        public string Name { get; set; }
        public decimal Value { get; set; }
        
        public ICollection<AssetWalletDto>? Assets { get; set; }
        public ICollection<LiabilityWalletDto>? Liabilities { get; set; }
    }
}
