using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HRData.Data;
using HRData.Models;
using HRData.Models.SalaryModels;

namespace HRData.Repositories
{
    public interface ISalaryRepository
    {
        //Attendance
        List<WorkingLog> GetAttendanceList(Employee employee);
        void CreateAttendance(WorkingLog newAttendance);
        void UpdateMyAttendance(Employee employee, WorkingLog updateAttendance);
        IEnumerable<WorkingLog> GetAttendanceList();
        WorkingLog GetAttendanceById(Employee employee, int id);
        WorkingLog GetAttendanceById(int id);

        void ApproveLog(int id);
        void RejectLog(int id);

        //TimeOff
        IEnumerable<WorkingLog> GetTimeOffList(Employee employee);
        WorkingLog GetTimeOffById(Employee employee, int id);
        void CreateTimeOff(WorkingLog newTimeOff);
        void UpdateMyTimeOff(Employee employee, WorkingLog updateTimeOff);
        IEnumerable<WorkingLog> GetTimeOffList();
        WorkingLog GetTimeOffById(int id);
    }
    public class SalaryRepository : Repository, ISalaryRepository
    {
        public SalaryRepository(ApplicationDbContext context) : base(context)
        {
        }

        public void ApproveLog(int id)
        {
            throw new NotImplementedException();
        }

        public void CreateAttendance(WorkingLog newAttendance)
        {
            throw new NotImplementedException();
        }

        public void CreateTimeOff(WorkingLog newTimeOff)
        {
            throw new NotImplementedException();
        }

        public WorkingLog GetAttendanceById(Employee employee, int id)
        {
            throw new NotImplementedException();
        }

        public WorkingLog GetAttendanceById(int id)
        {
            throw new NotImplementedException();
        }

        public List<WorkingLog> GetAttendanceList(Employee employee)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<WorkingLog> GetAttendanceList()
        {
            throw new NotImplementedException();
        }

        public WorkingLog GetTimeOffById(Employee employee, int id)
        {
            throw new NotImplementedException();
        }

        public WorkingLog GetTimeOffById(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<WorkingLog> GetTimeOffList(Employee employee)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<WorkingLog> GetTimeOffList()
        {
            throw new NotImplementedException();
        }

        public void RejectLog(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateMyAttendance(Employee employee, WorkingLog updateAttendance)
        {
            throw new NotImplementedException();
        }

        public void UpdateMyTimeOff(Employee employee, WorkingLog updateTimeOff)
        {
            throw new NotImplementedException();
        }
    }
}
