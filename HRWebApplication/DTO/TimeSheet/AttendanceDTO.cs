using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.DTO.TimeSheet
{
    public class AttendanceDTO : DTOBase
    {
        public DateTime Date { get; set; }
        public double Duration { get; set; }
        public string Note { get; set; }
    }
}
