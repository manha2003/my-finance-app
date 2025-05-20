using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Dtos
{
    public class ReminderAddDto
    {
        public string Title { get; set; }
        public string? Message { get; set; }
        public DateTime ReminderDate { get; set; }
    }
}
