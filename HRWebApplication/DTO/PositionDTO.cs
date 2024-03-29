﻿using HRData.Models;
using HRData.Models.JobModels;
using System;

namespace HRWebApplication.DTO
{
    public class PositionDTO : DTOBase
    {
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public Decimal Salary { get; set; }

        public EmployeeDTO Employee { get; set; }
        public JobTitleDTO JobTitle { get; set; }
        public WorkTypeDTO WorkType { get; set; }
        public OrganizationUnitDTO Unit { get; set; }

        #nullable enable
        public DateTime? LeaveDate { get; set; }
        public string? LeaveReason { get; set; }
        #nullable disable
        //public virtual LeaveType LeaveType { get; set; }
    }
}
