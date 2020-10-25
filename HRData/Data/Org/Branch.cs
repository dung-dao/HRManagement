using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Data
{
    public class Branch : NamedEntity
    {
        public List<Department> Departments { get; set; }
        public List<WorkPlace> WorkPlaces { get; set; }
        public BranchStatus Status { get; set; }
    }
}
