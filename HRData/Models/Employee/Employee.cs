using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Models
{
    public enum Sex
    {
        Male,
        Female
    }
    public class Employee : EntityBase
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfBirth { get; set; }
        [Column(TypeName = "varchar(10)")]
        public virtual Sex Sex { get; set; }
    }
}
