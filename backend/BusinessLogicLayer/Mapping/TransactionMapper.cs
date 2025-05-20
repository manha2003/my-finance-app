using AutoMapper;
using BusinessLogicLayer.Dtos;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Mapping
{
    public class TransactionMapperProfiles : Profile
    {
        public TransactionMapperProfiles()
        {
            CreateMap<Transaction, TransactionDto>()
             .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src =>
                src.Income != null ? src.Income.Category.CategoryName :
                src.Expense != null ? src.Expense.Category.CategoryName :
                src.Asset != null ? src.Asset.Category.CategoryName :
                src.Liability != null ? src.Liability.Category.CategoryName :
                "DELETED"))
             .ForMember(dest => dest.BudgetName, opt => opt.MapFrom(src =>
                src.Income != null ? src.Income.Budget.Name :
                src.Expense != null ? src.Expense.Budget.Name : ""))



            .ForMember(dest => dest.WalletName, opt => opt.MapFrom(src =>
                src.Expense != null && src.Expense.Budget != null && src.Expense.Budget.Wallet != null ?
                    src.Expense.Budget.Wallet.Name :
                src.Income != null && src.Income.Budget != null && src.Income.Budget.Wallet != null ?
                    src.Income.Budget.Wallet.Name :
                src.Asset != null && src.Asset.Wallet != null ?
                    src.Asset.Wallet.Name :
                src.Liability != null && src.Liability.Wallet != null ?
                    src.Liability.Wallet.Name :
                ""))
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => MapTransactionType(src)));
        }

     
        private string MapTransactionType(Transaction transaction)
        {
            if (transaction.IncomeId.HasValue)
            {
                return "Income";
            }
            else if (transaction.ExpenseId.HasValue)
            {
                return "Expense";
            }
            else if (transaction.AssetId.HasValue)
            {
                return "Asset";
            }
            else if (transaction.LiabilityId.HasValue)
            {
                return "Liability";
            }
            else
            {
                return "Unknown";
            }
        }
    }
 }