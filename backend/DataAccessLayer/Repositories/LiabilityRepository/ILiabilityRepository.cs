using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.LiabilityRepository
{
    public interface ILiabilityRepository
    {
        Task<Liability> GetLiabilityByIdAsync(int liabilityId);
        Task<IEnumerable<Liability>> GetLiabilitiesByWalletIdAsync(Guid walletId);
        Task<IEnumerable<Liability>> GetLiabilitiesByUserIdAsync(Guid userId);
        Task AddLiabilityAsync(Liability liability);
        Task UpdateLiabilityAsync(Liability liability);
        Task<Liability> GetLatestLiabilityAddedByUserAsync(Guid userId);
        Task DeleteLiabilityAsync(int liabilityId);


    }
}
