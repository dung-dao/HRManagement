using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Models
{
    class EmployeePosition : EntityBase
    {
        public virtual List<Employee> Employees { get; set; }
        public virtual List<Position> Positions { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
