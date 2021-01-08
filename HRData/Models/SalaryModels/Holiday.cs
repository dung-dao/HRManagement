using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Models.SalaryModels
{
    public class Holiday : EntityBase
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
    }
}
