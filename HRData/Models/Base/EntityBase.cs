namespace HRData.Models
{
    public class EntityBase
    {
        public int Id { get; set; }
        public RecordStatus RecordStatus { get; set; } = RecordStatus.Active;
    }
}
