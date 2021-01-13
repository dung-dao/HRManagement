using System;

namespace HRWebApplication.DTO
{
    public class HolidayDTO : DTOBase
    {
        public string Name { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
    }
}