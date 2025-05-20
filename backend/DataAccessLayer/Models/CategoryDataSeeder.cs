using DataAccessLayer.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class CategoryDataSeeder
    {
        private readonly OnlineExpenseTrackingDbContext _context;

        public CategoryDataSeeder(OnlineExpenseTrackingDbContext context)
        {
            _context = context;
        }

        public void Seed()
        {
            if(!_context.Categories.Any())
            {
                var categories = new List<Category>()
                {
                    // Expense Categories
                new Category { CategoryName = "Fast Food", IsCustom = false, IconName = "fastfood" },
                new Category { CategoryName = "Drinks", IsCustom = false, IconName = "localDrink" },
                new Category { CategoryName = "Electricity", IsCustom = false, IconName = "electricBolt" },
                new Category { CategoryName = "Bills", IsCustom = false, IconName = "receipt" },
                new Category { CategoryName = "Home", IsCustom = false, IconName = "home" },
                new Category { CategoryName = "Car Maintenance", IsCustom = false, IconName = "car" },
                new Category { CategoryName = "Groceries", IsCustom = false, IconName = "grocery" },
                new Category { CategoryName = "Travel", IsCustom = false, IconName = "flight" },
                new Category { CategoryName = "Medical", IsCustom = false, IconName = "hospital" },
                new Category { CategoryName = "Tuition", IsCustom = false, IconName = "school" },
                new Category { CategoryName = "Sports", IsCustom = false, IconName = "soccer" },
                new Category { CategoryName = "Entertainment", IsCustom = false, IconName = "theater" },
                new Category { CategoryName = "Phone", IsCustom = false, IconName = "phone" },
                new Category { CategoryName = "Internet", IsCustom = false, IconName = "wifi" },
                new Category { CategoryName = "Fitness", IsCustom = false, IconName = "fitness" },
                new Category { CategoryName = "Credit Card Payment", IsCustom = false, IconName = "creditCard" },
                new Category { CategoryName = "Repair", IsCustom = false, IconName = "build" },
                new Category { CategoryName = "Pets", IsCustom = false, IconName = "pet" },
                new Category { CategoryName = "Shopping", IsCustom = false, IconName = "shoppingCart" },
                new Category { CategoryName = "Music", IsCustom = false, IconName = "musicNote" },
                new Category { CategoryName = "Wine & Bar", IsCustom = false, IconName = "localBar" },

                // Income Categories
                new Category { CategoryName = "Salary", IsCustom = false, IconName = "salary" },
                new Category { CategoryName = "Freelance", IsCustom = false, IconName = "freelance" },
                new Category { CategoryName = "Investment", IsCustom = false, IconName = "investment" },
                new Category { CategoryName = "Gift", IsCustom = false, IconName = "gift" },
                new Category { CategoryName = "Bonus", IsCustom = false, IconName = "bonus" },
                new Category { CategoryName = "Rental Income", IsCustom = false, IconName = "rental" },
                new Category { CategoryName = "Savings", IsCustom = false, IconName = "savings" },
                new Category { CategoryName = "Dividend", IsCustom = false, IconName = "dividend" },
                new Category { CategoryName = "Commission", IsCustom = false, IconName = "commission" },
                new Category { CategoryName = "Business Income", IsCustom = false, IconName = "business" },
            
                // Asset Categories
                new Category { CategoryName = "Real Estate", IsCustom = false, IconName = "realEstate" },
                new Category { CategoryName = "Vehicles", IsCustom = false, IconName = "car" },
                new Category { CategoryName = "Stocks", IsCustom = false, IconName = "investment" },
                new Category { CategoryName = "Bonds", IsCustom = false, IconName = "savings" },
                new Category { CategoryName = "Cryptocurrency", IsCustom = false, IconName = "crypto" },
                new Category { CategoryName = "Jewelry", IsCustom = false, IconName = "gift" },
                new Category { CategoryName = "Art", IsCustom = false, IconName = "theater" },
                new Category { CategoryName = "Collectibles", IsCustom = false, IconName = "shoppingCart" },

                // Liability Categories
                new Category { CategoryName = "Mortgage", IsCustom = false, IconName = "home" },
                new Category { CategoryName = "Car Loan", IsCustom = false, IconName = "car" },
                new Category { CategoryName = "Credit Card Debt", IsCustom = false, IconName = "creditCard" },
                new Category { CategoryName = "Student Loan", IsCustom = false, IconName = "school" },
                new Category { CategoryName = "Medical Bills", IsCustom = false, IconName = "hospital" },
                new Category { CategoryName = "Personal Loan", IsCustom = false, IconName = "savings" }
            };
                _context.Categories.AddRange(categories);
                
                _context.SaveChanges();

            }
        }
    }
}
