using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Models
{
    public class Branch : EntityBase
    {
        [MaxLength(100)]
        public string Name { get; set; }
        [MaxLength(1000)]
        public string Address { get; set; }
        [MaxLength(20)]
        public string Status { get; set; }
    }
}
