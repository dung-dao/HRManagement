using System.Collections.Generic;

namespace HRData.Models
{
    /// <summary>
    /// Loại nghỉ phép
    /// </summary>
    public class LeaveType : NamedEntity
    {
        public string Code { get; set; }
        public virtual List<LeaveDetail> LeaveDetails { get; internal set; }
    }
}