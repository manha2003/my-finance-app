using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Helpers
{



    public class CustomDateTimeConverter : JsonConverter<DateTime>
    {
        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
           
            return DateTime.Parse(reader.GetString());
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            
            writer.WriteStringValue(GetFormattedDate(value));
        }

        private string GetFormattedDate(DateTime date)
        {
            string daySuffix = GetDaySuffix(date.Day);
            return $"{date.Day}{daySuffix} {date:MMM yyyy}";
        }

        private string GetDaySuffix(int day)
        {
            return (day % 10 == 1 && day != 11) ? "st"
                 : (day % 10 == 2 && day != 12) ? "nd"
                 : (day % 10 == 3 && day != 13) ? "rd"
                 : "th";
        }
    }
}