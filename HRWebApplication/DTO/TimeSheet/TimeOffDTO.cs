using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HRData.Models.SalaryModels;

namespace HRWebApplication.DTO.TimeSheet
{
    public class TimeOffDTO : DTOBase
    {
        public EmployeeDTO Employee { get; set; }
        public DateTime Date { get; set; }
        public double Duration { get; set; }
        public string Note { get; set; }
        public LogStatus LogStatus { get; set; }
        public TimeOffTypeDTO TimeOffType { get; set; }
    }
}
