using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.DTO.TimeSheet
{
    public class LeaveEntitlementDTO : DTOBase
    {
        public TimeOffTypeDTO TimeOffType { get; set; }
        public double Balance { get; set; }
    }
}
