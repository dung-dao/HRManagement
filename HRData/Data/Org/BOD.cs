using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Data
{
    public class BOD : EntityBase
    {
        public List<Employee> Employees { get; set; }
        public List<WorkPlace> WorkPlaces { get; set; }
        public string Name { get; set; }

    }
}
