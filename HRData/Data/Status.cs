using System.ComponentModel.DataAnnotations;

namespace HRData.Data
{
    public class Status : NamedEntity
    {
        [MaxLength(20)]
        public string Type { get; set; }
    }
}