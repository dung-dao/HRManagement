using HRData.Data;
using HRData.Models;
using HRData.Models.JobModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Repositories
{
    public interface ITimeSheetRepository
    {
        List<LeaveDetail> GetActiveLeaves();
        List<LeaveDetail> GetLeaves();
        void RequestLeave(LeaveDetail detail, Employee employee);
        void ApproveLeave(LeaveDetail leaveDetail, Employee reviewer);
        void RejectLeave(LeaveDetail leaveDetail, Employee reviewer);

        LeaveType GetLeaveTypeById(int id);
        LeaveDetail GetLeaveDetailById(int Id);

        #region Old
        //List<TimeSheet> GetTimeSheets(Employee employee, DateTime month);
        //void AddTimeSheet(Employee employee, TimeSheet timeSheet);
        //void UpdateTimeSheet(TimeSheet timeSheet);
        //void DeleteTimeSheet(int id);
        //Decimal CaculateSalary(Employee employee, DateTime month);
        #endregion
    }
    public class TimeSheetRepository : Repository, ITimeSheetRepository
    {
        private readonly IEmployeeRepostiory _employeeRepostiory;

        public TimeSheetRepository(
            ApplicationDbContext context,
            IEmployeeRepostiory employeeRepostiory
            )
            : base(context)
        {
            _employeeRepostiory = employeeRepostiory;
        }

        public void ApproveLeave(LeaveDetail leaveDetail, Employee reviewer)
        {
            leaveDetail.Status = LeaveStatuses.Approved;
            leaveDetail.Reviewer = reviewer;
        }

        public List<LeaveDetail> GetActiveLeaves()
        {
            return (from l in _context.LeaveDetails
                    where l.Status == LeaveStatuses.Pending && l.RecordStatus == RecordStatus.Active
                    select l).ToList();
        }

        public LeaveDetail GetLeaveDetailById(int Id)
        {
            return _context.LeaveDetails.Find(Id);
        }

        public List<LeaveDetail> GetLeaves()
        {
            return _context.LeaveDetails
                .Where(ld => ld.RecordStatus == RecordStatus.Active)
                .OrderBy(e => e.Date).ToList();
        }

        public LeaveType GetLeaveTypeById(int id)
        {
            var type = _context.LeaveTypes.Find(id);
            return (type.RecordStatus == RecordStatus.Active) ? type : null;
        }

        public void RequestLeave(LeaveDetail detail, Employee employee)
        {
            detail.RecordStatus = RecordStatus.Active;
            detail.Status = LeaveStatuses.Pending;
            detail.Employee = employee;
            _context.LeaveDetails.Add(detail);
        }

        public void RejectLeave(LeaveDetail leaveDetail, Employee reviewer)
        {
            leaveDetail.Status = LeaveStatuses.Rejected;
            leaveDetail.Reviewer = reviewer;
        }

        #region Old
        //public List<TimeSheet> GetTimeSheets(Employee employee, DateTime month)
        //{
        //    var pos = _employeeRepostiory.GetCurentPosition(employee);
        //    var query = from ts in pos.TimeSheets
        //                where
        //                ts.RecordStatus == RecordStatus.Active &&
        //                ts.StartTime.Month == month.Month &&
        //                ts.StartTime.Year == month.Year
        //                orderby ts.StartTime
        //                select ts;
        //    return query.ToList();
        //}

        //public void AddTimeSheet(Employee employee, TimeSheet timeSheet)
        //{
        //    var curPos = _employeeRepostiory.GetCurentPosition(employee);
        //    curPos.TimeSheets.Add(timeSheet);
        //}

        //public void DeleteTimeSheet(int id)
        //{
        //    var ts = _context.TimeSheets.Find(id);
        //    if (ts is not null)
        //    {
        //        ts.RecordStatus = RecordStatus.InActive;
        //    }
        //}

        //public void UpdateTimeSheet(TimeSheet timeSheet)
        //{
        //    var entry = _context.Entry(timeSheet);
        //    entry.State = EntityState.Modified;

        //    //Avoid modify status
        //    entry.Property(e => e.RecordStatus).IsModified = false;
        //}

        //public decimal CaculateSalary(Employee employee, DateTime month)
        //{
        //    //Get list timesheet
        //    var timesheets = GetTimeSheets(employee, month);
        //    double x = 0;
        //    timesheets.ForEach(e =>
        //    {
        //        var duration = e.EndTime - e.StartTime;
        //        if (duration.TotalHours >= 8)
        //            x += 1;
        //        else if (duration.TotalHours >= 4)
        //            x += 0.5;
        //    });
        //    var position = _employeeRepostiory.GetCurentPosition(employee);
        //    var salary = Convert.ToDouble(position.Salary + position.Allowance) / 23 * x;
        //    return Convert.ToDecimal(salary);
        //}
        #endregion
    }
}
