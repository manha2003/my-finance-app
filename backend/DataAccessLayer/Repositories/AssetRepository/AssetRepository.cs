using DataAccessLayer.Data;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.ExpenseRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.AssetRepository
{
    public class AssetRepository : IAssetRepository
    {
        private readonly OnlineExpenseTrackingDbContext _context;

        public AssetRepository(OnlineExpenseTrackingDbContext context)
        {
            _context = context;
        }

        public async Task<Asset> GetAssetByIdAsync(int assetId)
        {
            return await _context.Assets
                .Include(a => a.Wallet)
                .Include(e => e.Category)
                .Include(e => e.Transaction)
                .FirstOrDefaultAsync(a => a.AssetId == assetId);
        }

        public async Task<IEnumerable<Asset>> GetAssetByWalletIdAsync(Guid walletId)
        {
            return await _context.Assets
                .Where(a => a.WalletId == walletId)
                .Include(a => a.Category)
                .Include(a => a.Transaction)
                .ToListAsync();
        }

        public async Task<IEnumerable<Asset>> GetAssetsByUserIdAsync(Guid userId)
        {
            return await _context.Assets
                .Where(a => a.Wallet.UserId == userId)
                .Include(a => a.Category)
                .Include(a => a.Transaction)
                .ToListAsync();
        }

        public async Task AddAssetAsync(Asset asset)
        {
            await _context.Assets.AddAsync(asset);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAssetAsync(Asset asset)
        {
            _context.Assets.Update(asset);
            await _context.SaveChangesAsync();
        }

        public async Task<Asset> GetLatestAssetAddedByUserAsync(Guid userId)
        {
            return await _context.Assets 
                .Where(a => a.Wallet.UserId == userId)
                .OrderByDescending(a => a.Date)
                .FirstOrDefaultAsync();
        }

        public async Task DeleteAssetAsync(int assetId)
        {
            var asset = await GetAssetByIdAsync(assetId);
            if (asset != null)
            {
                _context.Assets.Remove(asset);
                await _context.SaveChangesAsync();
            }
        }
    }
}
