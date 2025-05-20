using BusinessLogicLayer.Helpers;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Dtos
{
    public class TransactionDto
    {
        public int TransactionId { get; set; }
        public string CategoryName { get; set; }
        public decimal Amount { get; set; }

        [JsonConverter(typeof(CustomDateTimeConverter))]
        public DateTime Date { get; set; }
        public string? BudgetName {  get; set; }
        public string? WalletName { get; set; }

        public string? Description { get; set; }
        public string Type { get; set; }
      
    }
}
