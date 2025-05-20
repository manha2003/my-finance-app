using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CsvHelper.Configuration;
using CsvHelper.Configuration.Attributes;

namespace BusinessLogicLayer.Dtos
{
    public class FinancialDto
    {
            [Name("CategoryId")]
            public int CategoryId { get; set; }
            [Name("Amount")]
            public decimal Amount { get; set; }
            [Name("Description")]    
            public string Description { get; set; }
            [Name("Type")]
            public string Type { get; set; } 
        
    }
}
