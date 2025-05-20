using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.LiabilityRepository
{
    public class LiabilityRepository :  ILiabilityRepository
    {
        private readonly OnlineExpenseTrackingDbContext _context;

        public LiabilityRepository(OnlineExpenseTrackingDbContext context)
        {
            _context = context;
        }

        public async Task<Liability> GetLiabilityByIdAsync(int liabilityId)
        {
            return await _context.Liabilities
                .Include(l => l.Wallet)
                .Include(l => l.Category)
                .Include(l=> l.Transaction)
                .FirstOrDefaultAsync(l => l.LiabilityId == liabilityId);
        }

        public async Task<IEnumerable<Liability>> GetLiabilitiesByWalletIdAsync(Guid walletId)
        {
            return await _context.Liabilities
                .Where(l => l.WalletId == walletId)
                .Include(l => l.Category)
                .Include(l => l.Transaction)
                .ToListAsync();
        }

        public async Task<IEnumerable<Liability>> GetLiabilitiesByUserIdAsync(Guid userId)
        {
            return await _context.Liabilities
                .Where(l => l.Wallet.UserId == userId)
                .Include(l => l.Category)
                .Include(l => l.Transaction)
                .ToListAsync();
        }

        public async Task AddLiabilityAsync(Liability liability)
        {
            await _context.Liabilities.AddAsync(liability);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateLiabilityAsync(Liability liability)
        {
            _context.Liabilities.Update(liability);
            await _context.SaveChangesAsync();
        }

        public async Task<Liability> GetLatestLiabilityAddedByUserAsync(Guid userId)
        {
            return await _context.Liabilities
                .Where(l => l.Wallet.UserId == userId)
                .OrderByDescending(l => l.Date)
                .FirstOrDefaultAsync();
        }

        public async Task DeleteLiabilityAsync(int liabilityId)
        {
            var liability = await GetLiabilityByIdAsync(liabilityId);
            if (liability != null)
            {
                _context.Liabilities.Remove(liability);
                await _context.SaveChangesAsync();
            }
        }
    }
}
