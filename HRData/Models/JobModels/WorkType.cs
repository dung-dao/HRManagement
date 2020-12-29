namespace HRData.Models.JobModels
{
    /// <summary>
    /// Loại hình làm việc
    /// </summary>
    public class WorkType : NamedEntity
    {
        /// <summary>
        /// Số ngày được nghỉ phép trong tháng
        /// </summary>
        public double LeaveEntitlement { get; set; }
    }
}
