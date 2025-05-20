using System;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Username { get; set; }

        [MaxLength(20)]
        public string? FirstName { get; set; }

        [MaxLength(20)]
        public string? LastName { get; set; }


        [Required]
        [MaxLength(256)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string PasswordHash { get; set; }

        [MaxLength(12)]
        public string? PhoneNumber { get; set; }

        [MaxLength(50)]
        public string? Address { get; set; }

        public bool IsEmailConfirmed { get; set; }

        [MaxLength(100)]
        public string? EmailConfirmationToken { get; set; }


        public ICollection<Budget>? Budgets { get; set; } 
        public ICollection<Transaction>? Transactions { get; set; } 
        public ICollection<Category> Categories { get; set; } 
    
        public ICollection<Reminder>? Reminders { get; set; }
        public ICollection<Wallet>? Wallets { get; set; }
    }
}
