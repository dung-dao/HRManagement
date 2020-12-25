using HRData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.DTO
{
    public class LeaveDetailDTO : DTOBase
    {
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public LeaveTypeDTO LeaveType { get; set; }
    }
}
