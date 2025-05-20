using AutoMapper;
using BusinessLogicLayer.Dtos;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.BudgetRepository;
using DataAccessLayer.Repositories.UserRepository;
using DataAccessLayer.Repositories.WalletRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services.WalletService
{
    public class WalletService: IWalletService
    {
        private readonly IWalletRepository _walletRepository;
        private readonly IUserRepository _userRepository;
        private readonly IBudgetRepository _budgetRepository;
        private readonly IMapper _mapper;

        public WalletService(IWalletRepository walletRepository, IUserRepository userRepository,IBudgetRepository budgetRepository, IMapper mapper)
        {
            _walletRepository = walletRepository;
            _budgetRepository = budgetRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task CreateWalletAsync(WalletAddDto walletAddDto, Guid userId)
        {
            var wallet = _mapper.Map<Wallet>(walletAddDto);
            wallet.UserId = userId;
            await _walletRepository.AddWalletAsync(wallet);
        }

        public async Task<IEnumerable<WalletDetailsDto>> GetWalletsByUserIdAsync(Guid userId)
        {
            var user = await _userRepository.GetByUserIdAsync(userId);
            if (user == null)
            {
                throw new InvalidOperationException("User does not exist.");
            }

            var wallets = await _walletRepository.GetWalletsByUserIdAsync(userId);


            var walletDtos = _mapper.Map<IEnumerable<WalletDetailsDto>>(wallets);
           

            return walletDtos;
        }

        public async Task<BalanceDto> GetWalletsBalanceAsync(Guid userId)
        {
            var user = await _userRepository.GetByUserIdAsync(userId);
            if (user == null)
            {
                throw new InvalidOperationException("User does not exist.");
            }
            var wallets = await _walletRepository.GetWalletsByUserIdAsync(userId);

            decimal totalBalance = 0;
            decimal totalAssets = 0;
            decimal totalLiabilities = 0;


            foreach (var wallet in wallets)
            {

                totalBalance += wallet.Value;

               
                if (wallet.Assets != null)
                {
                    totalAssets += wallet.Assets.Sum(asset => asset.Amount);
                }

               
                if (wallet.Liabilities != null)
                {
                    totalLiabilities += wallet.Liabilities.Sum(liability => liability.Amount);
                }
            }

            var balanceDto = new BalanceDto
            {
                Balance = totalBalance,
                TotalAssets = totalAssets,
                TotalLiabilities = totalLiabilities
            };
            return balanceDto;


        }

        public async Task<WalletDetailsDto> GetWalletByIdAsync(Guid walletId)
        {
            var wallet = await _walletRepository.GetWalletByIdAsync(walletId);
            if (wallet == null)
            {
                throw new InvalidOperationException("Wallet not found.");
            }

            return _mapper.Map<WalletDetailsDto>(wallet);
        }

        public async Task DeleteWalletAsync(Guid walletId)
        {
            
            var wallet = await _walletRepository.GetWalletByIdAsync(walletId);
            if (wallet == null)
            {
                throw new InvalidOperationException("Wallet not found.");
            }

 
            var budgets = await _budgetRepository.GetBudgetsByWalletIdAsync(walletId);
            foreach (var budget in budgets)
            {
                await _budgetRepository.DeleteBudgetAsync(budget.BudgetId);
            }

            await _walletRepository.DeleteWalletAsync(walletId);
        }
    }
}
