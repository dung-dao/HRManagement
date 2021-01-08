namespace HRData.Models.SalaryModels
{
    public class LeaveBalance : EntityBase
    {
        public double Balance { get; set; }
        public Employee Employee { get; set; }
        public TimeOffType Type { get; set; }
    }
}