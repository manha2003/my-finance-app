using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Reminder
    {
        public int ReminderId { get; set; }
        public string Title { get; set; }
        public Guid UserId { get; set; } 
        public string? Message { get; set; } 
        public DateTime ReminderDate { get; set; }
        public bool IsSend { get; set; } 
        public string Email { get; set; }

        
        public User User { get; set; } 
    }
}
