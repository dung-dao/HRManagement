using HRData.Models;
using HRData.Models.JobModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.DTO
{
    public class LeaveDetailDTO
    {
        public DateTime Date { get; set; }
        public string Reason { get; set; }
        public LeaveTypeDTO Type { get; set; }
    }
}
