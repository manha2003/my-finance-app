using BusinessLogicLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services.WalletService
{
    public interface IWalletService
    {
        Task CreateWalletAsync(WalletAddDto walletAddDto, Guid userId);
        Task<WalletDetailsDto> GetWalletByIdAsync(Guid walletId);
        Task<IEnumerable<WalletDetailsDto>> GetWalletsByUserIdAsync(Guid userId);
        Task<BalanceDto> GetWalletsBalanceAsync(Guid userId);
        Task DeleteWalletAsync(Guid walletId);
    }
}
