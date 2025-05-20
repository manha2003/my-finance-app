using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

using System.Text;
using System.Threading.Tasks;
using System.Reflection.Emit;
using System.Diagnostics;

namespace DataAccessLayer.Data
{
    public class OnlineExpenseTrackingDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Budget> Budgets { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Category> Categories { get; set; }
      
        public DbSet<Reminder> Reminders { get; set; }
        public DbSet<Wallet> Wallets { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<Liability> Liabilities { get; set; }

        public OnlineExpenseTrackingDbContext(DbContextOptions<OnlineExpenseTrackingDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(u => u.UserId);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Budget configuration
            modelBuilder.Entity<Budget>()
                .HasKey(b => b.BudgetId);

            modelBuilder.Entity<Budget>()
                .Property(b => b.TotalAmount)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Budget>()
                .Property(b => b.MoneySpent)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Budget>()
                .HasOne(b => b.User)
                .WithMany(u => u.Budgets)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Budget>()
               .HasOne(b => b.Wallet) 
               .WithMany(w => w.Budgets)
               .HasForeignKey(b => b.WalletId)
               .OnDelete(DeleteBehavior.Cascade);

            // Expense configuration
            modelBuilder.Entity<Expense>()
                .HasKey(e => e.ExpenseId);

            modelBuilder.Entity<Expense>()
                .Property(e => e.Amount)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.Budget)
                .WithMany(b => b.Expenses)
                .HasForeignKey(e => e.BudgetId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.Category)
                .WithMany(c => c.Expenses)
                .HasForeignKey(e => e.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.Transaction)
                .WithOne(t => t.Expense)
                .HasForeignKey<Expense>(e => e.TransactionId)
                .OnDelete(DeleteBehavior.Restrict);

            // Income configuration
            modelBuilder.Entity<Income>()
                .HasKey(i => i.IncomeId);

            modelBuilder.Entity<Income>()
                .Property(i => i.Amount)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Income>()
                .HasOne(i => i.Budget)
                .WithMany(b => b.Incomes)
                .HasForeignKey(i => i.BudgetId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Income>()
                .HasOne(i => i.Category)
                .WithMany(c => c.Incomes)
                .HasForeignKey(i => i.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Income>()
                .HasOne(i => i.Transaction)
                .WithOne(t => t.Income)
                .HasForeignKey<Income>(i => i.TransactionId)
                .OnDelete(DeleteBehavior.Restrict);

            // Transaction configuration
            modelBuilder.Entity<Transaction>()
                .HasKey(t => t.TransactionId);

            modelBuilder.Entity<Transaction>()
                .Property(t => t.Amount)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.User)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Category configuration
            modelBuilder.Entity<Category>()
                .HasKey(c => c.CategoryId);

            modelBuilder.Entity<Category>()
                .Property(c => c.IsCustom)
                .HasDefaultValue(false);

            modelBuilder.Entity<Category>()
                .HasOne(c => c.User)
                .WithMany(u => u.Categories)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

          

            // Reminder configuration
            modelBuilder.Entity<Reminder>()
                .HasKey(r => r.ReminderId);

            modelBuilder.Entity<Reminder>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reminders)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Wallet configuration
            modelBuilder.Entity<Wallet>()
                .HasKey(w => w.WalletId);

            modelBuilder.Entity<Wallet>()
                .Property(w => w.Value)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Wallet>()
                .HasOne(w => w.User)
                .WithMany(u => u.Wallets)
                .HasForeignKey(w => w.UserId)
                .OnDelete(DeleteBehavior.Cascade);// Cascade delete if the User is deleted

           modelBuilder.Entity<Wallet>()
            .HasMany(w => w.Budgets)
            .WithOne(b => b.Wallet)
            .HasForeignKey(b => b.WalletId)
            .OnDelete(DeleteBehavior.Restrict);  // Cascade delete if the Wallet is deleted

            modelBuilder.Entity<Wallet>()
                .HasMany(w => w.Assets)
                .WithOne(a => a.Wallet)
                .HasForeignKey(a => a.WalletId)
                .OnDelete(DeleteBehavior.Cascade);  // Cascade delete for related assets

            modelBuilder.Entity<Wallet>()
                .HasMany(w => w.Liabilities)
                .WithOne(l => l.Wallet)
                .HasForeignKey(l => l.WalletId)
                .OnDelete(DeleteBehavior.Cascade);  // Cascade delete for related liabilities

            // Asset configuration
            modelBuilder.Entity<Asset>()
                .HasKey(a => a.AssetId);

            modelBuilder.Entity<Asset>()
                .Property(a => a.Amount)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Asset>()
                .HasOne(a => a.Wallet)
                .WithMany(w => w.Assets)
                .HasForeignKey(a => a.WalletId)
                .OnDelete(DeleteBehavior.Cascade);  // Cascade delete if Wallet is deleted

            modelBuilder.Entity<Asset>()
                .HasOne(a => a.Category)
                .WithMany(c => c.Assets)
                .HasForeignKey(a => a.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);  // Restrict delete if Category has assets

            modelBuilder.Entity<Asset>()
                .HasOne(a => a.Transaction)
                .WithOne(t => t.Asset)
                .HasForeignKey<Asset>(a => a.TransactionId)
                .OnDelete(DeleteBehavior.Restrict);  // Restrict delete if Transaction is linked to Asset

            // Liability configuration
            modelBuilder.Entity<Liability>()
                .HasKey(l => l.LiabilityId);

            modelBuilder.Entity<Liability>()
                .Property(l => l.Amount)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Liability>()
                .HasOne(l => l.Wallet)
                .WithMany(w => w.Liabilities)
                .HasForeignKey(l => l.WalletId)
                .OnDelete(DeleteBehavior.Cascade);  // Cascade delete if Wallet is deleted

            modelBuilder.Entity<Liability>()
                .HasOne(l => l.Category)
                .WithMany(c => c.Liabilities)
                .HasForeignKey(l => l.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);  // Restrict delete if Category is linked to Liability

            modelBuilder.Entity<Liability>()
                .HasOne(l => l.Transaction)
                .WithOne(t => t.Liability)
                .HasForeignKey<Liability>(l => l.TransactionId)
                .OnDelete(DeleteBehavior.Restrict);  // Restrict delete if Transaction is linked to Liability
        }
    }
}
     
    
