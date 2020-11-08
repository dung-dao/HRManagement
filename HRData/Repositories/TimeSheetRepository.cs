using HRData.Data;
using HRData.Models.JobModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Repositories
{
    public interface ITimeSheetRepository
    {
        List<TimeSheetDetail> GetTimeSheet(int month, int year);
        void AddTimeSheetItem(DateTime date, DayWorkStatus status);
        void UpdateTimeSheetItem(TimeSheetDetail item);
    }
    class TimeSheetRepository : Repository, ITimeSheetRepository
    {
        public TimeSheetRepository(ApplicationDbContext context) : base(context)
        {
        }

        public void AddTimeSheetItem(DateTime date, DayWorkStatus status)
        {
            throw new NotImplementedException();
        }

        public List<TimeSheetDetail> GetTimeSheet(int month, int year)
        {
            throw new NotImplementedException();
        }

        public void UpdateTimeSheetItem(TimeSheetDetail item)
        {
            throw new NotImplementedException();
        }
    }
}
