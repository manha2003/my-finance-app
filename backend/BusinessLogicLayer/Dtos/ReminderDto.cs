using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Dtos
{
    public class ReminderDto
    {
        public string Title { get; set; }
        public int ReminderId { get; set; }
        public string Message { get; set; }
        public DateTime ReminderDate { get; set; }
        public bool IsSend { get; set; }
    }
}
