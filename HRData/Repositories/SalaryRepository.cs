using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Helper.Exceptions;
using HRData.Data;
using HRData.Models;
using HRData.Models.SalaryModels;

namespace HRData.Repositories
{
    public interface ISalaryRepository
    {
        //Attendance
        IEnumerable<WorkingLog> GetAttendanceList(); //
        List<WorkingLog> GetEmployeeAttendanceList(Employee employee); //

        void CreateAttendance(WorkingLog newAttendance, Employee employee); //
        void UpdateAttendance(WorkingLog log, WorkingLog update); //

        WorkingLog GetAttendanceById(int id); //

        void ApproveLog(WorkingLog wl); //
        void RejectLog(WorkingLog wl); //

        //TimeOff
        IEnumerable<WorkingLog> GetTimeOffList();
        IEnumerable<WorkingLog> GetTimeOffList(Employee employee);
        // LeaveEntitlement GetLeaveEntitlement(Employee employee, TimeOffType type);

        void CreateTimeOff(WorkingLog newTimeOff, Employee employee);
        void UpdateMyTimeOff(WorkingLog log, WorkingLog update);
        WorkingLog GetTimeOffById(int id);
        List<PaySlip> GetPaySlips(Employee employee);

        //TimeOffType
        TimeOffType GetTimeOffTypeById(int id);

        //Salary
        PayRoll CreatePayroll(DateTime startDate, DateTime endDate, Employee author);
        void ConfirmSalaryPayment(PaySlip salaryPayment);

        List<PayRoll> GetPayRoll();
        PayRoll GetPayRoll(int id);
        void DeletePayroll(int id);



        //Helper
        WorkingLog GetWorkingLogById(int id);
        void RemoveAttendance(WorkingLog log);
        void RemoveMyTimeOff(WorkingLog log);
        List<PaySlip> GetPaySlips(PayRoll payroll);
    }
    public class SalaryRepository : Repository, ISalaryRepository
    {
        private readonly IEmployeeRepostiory _employeeRepostiory;

        public SalaryRepository(
            ApplicationDbContext context,
            IEmployeeRepostiory employeeRepostiory
            ) : base(context)
        {
            _employeeRepostiory = employeeRepostiory;
        }

        public void ApproveLog(WorkingLog wl)
        {
            wl.LogStatus = LogStatus.Approved;
        }

        public WorkingLog GetAttendanceById(int id)
        {
            return _context.WorkingLogs.FirstOrDefault(
                 e => e.Id == id &&
                 e.Type == WorkingLogType.Attendance &&
                 e.RecordStatus == RecordStatus.Active
                 );
        }

        public List<WorkingLog> GetEmployeeAttendanceList(Employee employee)
        {
            return _context.WorkingLogs
            .Where(e =>
                e.Type == WorkingLogType.Attendance &&
                e.RecordStatus == RecordStatus.Active &&
                e.Employee.Id == employee.Id
            ).OrderByDescending(wl => wl.Date)
            .ToList();
        }

        public IEnumerable<WorkingLog> GetAttendanceList()
        {
            return _context.WorkingLogs
            .Where(e =>
                e.RecordStatus == RecordStatus.Active &&
                e.Type == WorkingLogType.Attendance
            ).OrderByDescending(wl => wl.Date)
            .ToList();
        }
        public WorkingLog GetWorkingLogById(int id) => _context.WorkingLogs.Find(id);
        public void RejectLog(WorkingLog wl)
        {
            wl.LogStatus = LogStatus.Rejected;
        }

        public void CreateAttendance(WorkingLog newAttendance, Employee employee)
        {
            newAttendance.LogStatus = LogStatus.Pending;
            newAttendance.Employee = employee;
            _context.WorkingLogs.Add(newAttendance);
        }

        public void UpdateAttendance(WorkingLog log, WorkingLog update)
        {
            if (log.LogStatus != LogStatus.Pending)
                throw new Exception("Update approved data");
            log.Date = update.Date;
            log.Duration = update.Duration;
            log.Note = update.Note;
        }

        public IEnumerable<WorkingLog> GetTimeOffList()
        {
            return _context.WorkingLogs
            .Where(e =>
                e.RecordStatus == RecordStatus.Active &&
                e.Type == WorkingLogType.TimeOff
            ).OrderByDescending(wl => wl.Date)
            .ToList();
        }

        public IEnumerable<WorkingLog> GetTimeOffList(Employee employee)
        {
            return _context.WorkingLogs
            .Where(e =>
                e.Type == WorkingLogType.TimeOff &&
                e.RecordStatus == RecordStatus.Active &&
                e.Employee.Id == employee.Id
            ).OrderByDescending(wl => wl.Date)
            .ToList();
        }

        public void CreateTimeOff(WorkingLog newTimeOff, Employee employee)
        {
            newTimeOff.LogStatus = LogStatus.Pending;
            // double balance;
            // LeaveEntitlement le = GetLeaveEntitlement(employee, newTimeOff.TimeOffType);
            // if (le is null)
            //     balance = 0;
            // else
            //     balance = le.Balance;

            // if (balance < newTimeOff.Duration && newTimeOff.TimeOffType.IsPaidTimeOff)
            //     throw new ClientException();

            newTimeOff.Employee = employee;
            _context.WorkingLogs.Add(newTimeOff);
        }

        public void UpdateMyTimeOff(WorkingLog log, WorkingLog update)
        {
            log.Date = update.Date;
            log.Duration = update.Duration;
            log.Note = update.Note;
            log.TimeOffType = update.TimeOffType;
        }

        public WorkingLog GetTimeOffById(int id)
        {
            return _context.WorkingLogs.FirstOrDefault(
                e => e.Id == id &&
                e.Type == WorkingLogType.TimeOff &&
                e.RecordStatus == RecordStatus.Active
                );
        }

        public PayRoll CreatePayroll(DateTime startDate, DateTime endDate, Employee author)
        {
            throw new NotImplementedException();
            //double salaryTime = 0.0;
            //var position = _employeeRepostiory.GetCurentPosition(employee);
            //double positionSalary = position != null ? decimal.ToDouble(position.Salary) : 0.0;

            ////Clean Temp
            //var temp = _context.SalaryPayments
            //                .Where(sp => sp.Employee.Id == employee.Id && sp.Status == PaySlipStatus.Temporary);
            //_context.SalaryPayments.RemoveRange(temp);

            //PaySlip lastPayment = _context.SalaryPayments
            //    .Where(
            //        sp => sp.Employee.Id == employee.Id &&
            //        sp.Status == PaySlipStatus.Confirmed
            //    ).OrderByDescending(sp => sp.Period)
            //    .FirstOrDefault();

            //var attendanceTime = from wl in _context.WorkingLogs
            //                     where wl.RecordStatus == RecordStatus.Active &&
            //                     wl.Type == WorkingLogType.Attendance &&
            //                     wl.LogStatus == LogStatus.Approved &&
            //                     wl.Date > lastPayment.Period && wl.Date <= DateTime.Now
            //                     group wl by wl.Date into g
            //                     select new { Date = g.Key, Duration = g.Sum(e => e.Duration) };

            //var timeoff = from wl in _context.WorkingLogs
            //              where wl.RecordStatus == RecordStatus.Active &&
            //              wl.Type == WorkingLogType.TimeOff &&
            //              wl.LogStatus == LogStatus.Approved &&
            //              wl.Date > lastPayment.Period && wl.Date <= DateTime.Now &&
            //              wl.TimeOffType.IsPaidTimeOff
            //              select wl.Duration;

            //var holidays = from hd in _context.Holidays
            //               where hd.From > lastPayment.Period &&
            //               hd.To <= DateTime.Now &&
            //               hd.RecordStatus == RecordStatus.Active
            //               select hd;

            ////Caculate Attendance            
            ////Nếu thời gian làm việc trong ngày lớn hơn 9h --> nhận 120% lương
            ////Nếu thời gian làm việc trong ngày lớn hơn nhỏ hơn 4 tiếng --> nhận 70% lương
            //foreach (var e in attendanceTime)
            //{
            //    if (e.Duration < 4) //Làm ít quá
            //        salaryTime += e.Duration * 0.7;
            //    else if (e.Duration <= 8) //Bình thường
            //        salaryTime += e.Duration;
            //    else if (e.Duration > 8) //OT
            //        salaryTime += 8 + (e.Duration - 8) * 1.2;
            //}

            //foreach (var e in timeoff)
            //{
            //    salaryTime += e;
            //}

            ////Holiday
            //foreach (var h in holidays)
            //{
            //    salaryTime += ((h.To - h.From).Days + 1) * 8;
            //}

            //double TotalSalary = positionSalary / 23 * salaryTime;

            //PaySlip payment = new PaySlip()
            //{
            //    Status = PaySlipStatus.Temporary,
            //    Amount = Convert.ToDecimal(TotalSalary),
            //    Period = DateTime.Today,
            //    RecordStatus = RecordStatus.Active,
            //    Employee = employee
            //};

            //_context.SalaryPayments.Add(payment);
            //return payment;
        }

        public TimeOffType GetTimeOffTypeById(int id)
        {
            return _context.TimeOffTypes.Find(id);
        }

        public void ConfirmSalaryPayment(PaySlip salaryPayment)
        {
            salaryPayment.Status = PaySlipStatus.Confirmed;
        }

        public void RemoveAttendance(WorkingLog log)
        {
            log.RecordStatus = RecordStatus.InActive;
        }

        public void RemoveMyTimeOff(WorkingLog log)
        {
            log.RecordStatus = RecordStatus.InActive;
        }

        public List<PayRoll> GetPayRoll()
        {
            throw new NotImplementedException();
        }

        public PayRoll GetPayRoll(int id)
        {
            throw new NotImplementedException();
        }

        public void DeletePayroll(int id)
        {
            //Cascade Delete all payslips
            throw new NotImplementedException();
        }

        public List<PaySlip> GetPaySlips(Employee employee)
        {
            throw new NotImplementedException();
        }

        public List<PaySlip> GetPaySlips(PayRoll payroll)
        {
            throw new NotImplementedException();
        }
    }
}
