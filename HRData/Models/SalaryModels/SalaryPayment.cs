using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Models.SalaryModels
{
    public class SalaryPayment : EntityBase
    {
        public decimal Amount { get; set; }
        public DateTime Period { get; set; }

        // public virtual Employee Employee { get; set; }
        // public virtual List<WorkingLog> WorkingLogs { get; set; }
    }
}
