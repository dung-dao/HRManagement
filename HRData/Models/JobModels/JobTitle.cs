namespace HRData.Models.JobModels
{
    /// <summary>
    /// Vị trí công việc nhân viên bán hàng, nhân viên thu ngân...
    /// </summary>
    public class JobTitle : NamedEntity
    {
        public int JobCategoryId { get; set; }
        public virtual JobCategory JobCategory { get; set; }
    }
}
