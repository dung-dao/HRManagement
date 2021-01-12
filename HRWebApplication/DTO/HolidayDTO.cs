using System;

namespace HRWebApplication.DTO
{
    public class HolidayDTO : DTOBase
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
    }
}