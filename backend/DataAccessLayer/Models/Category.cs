using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Category
    {
       public int CategoryId { get; set; } 
       public string CategoryName { get; set; }
       public Guid? UserId { get; set; }
       public bool IsCustom { get; set; }
       public string IconName { get; set; }
           
       public ICollection<Expense>? Expenses { get; set; }
       public ICollection<Income>? Incomes { get; set; }
       public ICollection<Asset>? Assets { get; set; }
       public ICollection<Liability> Liabilities { get; set; }
       public User? User { get; set; } 
      
    

     }
    }


