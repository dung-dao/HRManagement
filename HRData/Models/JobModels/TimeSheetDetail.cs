using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Models.JobModels
{
    public class TimeSheetDetail
    {
        public DateTime Date { get; set; }
        public Employee Employee { get; set; }
        public DayWorkStatus DayWorkStatus { get; set; }
    }
}
