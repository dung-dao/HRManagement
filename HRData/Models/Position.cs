using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Models
{
    public class Position : EntityBase
    {
        public EmployeeType EmployeeType { get; set; }
        public JobCategory JobCategory { get; set; }
        public Branch Branch { get; set; }
        public WorkType WorkType { get; set; }
    }
}
