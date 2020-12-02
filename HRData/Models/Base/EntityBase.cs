using System;

namespace HRData.Models
{
    public class EntityBase
    {
        public int Id { get; set; }
        public RecordStatus RecordStatus { get; set; } = RecordStatus.Active;
        public static bool Exists(EntityBase entity) => entity is not null && entity.RecordStatus == RecordStatus.Active;
    }
}
