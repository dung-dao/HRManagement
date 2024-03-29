﻿using HRData.Models.SalaryModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.DTO.TimeSheet
{
    public class TimeOffTypeDTO : DTOBase
    {
        public string Name { get; set; }
         public string Description { get; set; }
        public bool IsPaidTimeOff { get; set; }
    }
}
