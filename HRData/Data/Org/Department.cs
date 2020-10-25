using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Data
{
    public class Department : NamedEntity
    {
        public Branch Branch { get; set; }
        public List<Employee> Employees { get; set; } //Sau này đổi thành quan hệ n:n để tracking lịch sử chuyển công tác

    }
}
