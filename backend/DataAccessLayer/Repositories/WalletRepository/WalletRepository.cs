using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.WalletRepository
{
    public class WalletRepository : IWalletRepository
    {
        private readonly OnlineExpenseTrackingDbContext _context;

        public WalletRepository(OnlineExpenseTrackingDbContext context)
        {
            _context = context;
        }

        public async Task<Wallet> GetWalletByIdAsync(Guid walletId)
        {
            return await _context.Wallets
                .Include(w => w.Assets)
                .Include(w => w.Liabilities)
                .FirstOrDefaultAsync(w => w.WalletId == walletId);
        }
        public async Task<IEnumerable<Wallet>> GetWalletsByUserIdAsync(Guid userId)
        {
            return await _context.Wallets
                .Where(w => w.UserId == userId)
                .Include(w => w.Assets)
                .Include(w => w.Liabilities)
                .ToListAsync();
        }

        public async Task AddWalletAsync(Wallet wallet)
        {
            _context.Wallets.AddAsync(wallet);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateWalletAsync(Wallet wallet)
        {
            _context.Wallets.Update(wallet);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteWalletAsync(Guid walletId)
        {
            var wallet = await GetWalletByIdAsync(walletId);
            if (wallet != null)
            {
                _context.Wallets.Remove(wallet);
                await _context.SaveChangesAsync();
            }
        }
    }

}
