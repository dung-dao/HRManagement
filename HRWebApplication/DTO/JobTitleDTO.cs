namespace HRWebApplication.DTO
{
    /// <summary>
    /// Vị trí công việc nhân viên bán hàng, nhân viên thu ngân...
    /// </summary>
    public class JobTitleDTO : NamedDTO
    {
        public JobCategoryDTO JobCategory { get; set; }
    }
}
