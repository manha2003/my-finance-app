using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.WalletRepository
{
    public interface IWalletRepository
    {
        Task<Wallet> GetWalletByIdAsync(Guid walletId);
        Task<IEnumerable<Wallet>> GetWalletsByUserIdAsync(Guid userId);
        Task AddWalletAsync(Wallet wallet);
        Task UpdateWalletAsync(Wallet wallet);
        Task DeleteWalletAsync(Guid walletId);

    }
}
