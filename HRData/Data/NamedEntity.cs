using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Data
{
    public class NamedEntity : EntityBase
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
