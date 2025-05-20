using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.AssetRepository
{
    public interface IAssetRepository
    {
        Task<Asset> GetAssetByIdAsync(int assetId);
        Task<IEnumerable<Asset>> GetAssetByWalletIdAsync(Guid walletId);
        Task<IEnumerable<Asset>> GetAssetsByUserIdAsync(Guid userId);
        Task AddAssetAsync(Asset asset);
        Task UpdateAssetAsync(Asset asset);
        Task<Asset> GetLatestAssetAddedByUserAsync(Guid userId);
        Task DeleteAssetAsync(int assetId);
    }
}
