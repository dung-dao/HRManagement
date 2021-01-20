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
        PaySlip CreatePayslip(Employee employee, DateTime startDate, DateTime endDate);

        List<PayRoll> GetPayRoll();
        PayRoll GetPayRoll(int id);
        void DeletePayroll(PayRoll payRoll);



        //Helper
        WorkingLog GetWorkingLogById(int id);
        void RemoveAttendance(WorkingLog log);
        void RemoveMyTimeOff(WorkingLog log);
        List<PaySlip> GetPaySlips(PayRoll payroll);
        void ConfirmPayroll(PayRoll payroll);
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

        public PaySlip CreatePayslip(Employee employee, DateTime startDate, DateTime endDate)
        {
            PaySlip payslip = new PaySlip()
            {
                Amount = 0,
                StartDate = startDate,
                EndDate = endDate,
                Employee = employee,

                Attendance = 0,
                PaidTimeOff = 0,
                HolidayTimeOff = 0,
                UnpaidTimeOff = 0,

                RecordStatus = RecordStatus.Active,
                Status = PaySlipStatus.Temporary
            };

            double salaryDays = 0.0;
            var position = _employeeRepostiory.GetCurentPosition(employee);
            double positionSalary = position != null ? decimal.ToDouble(position.Salary) : 0.0;

            var attendanceTime = from wl in _context.WorkingLogs
                                 where wl.RecordStatus == RecordStatus.Active &&
                                 wl.LogStatus == LogStatus.Approved &&
                                 wl.Type == WorkingLogType.Attendance &&
                                 wl.Employee.Id == employee.Id &&

                                 wl.Date >= startDate && wl.Date <= endDate
                                 group wl by wl.Date into g
                                 select new { Date = g.Key, Duration = g.Sum(e => e.Duration) };

            var paidTimeOff = from wl in _context.WorkingLogs
                              where wl.RecordStatus == RecordStatus.Active &&
                              wl.Employee.Id == employee.Id &&
                              wl.Type == WorkingLogType.TimeOff &&
                              wl.LogStatus == LogStatus.Approved &&
                              wl.Date >= startDate && wl.Date <= endDate &&
                              wl.TimeOffType.IsPaidTimeOff
                              select wl;

            var unPaidTimeOff = from wl in _context.WorkingLogs
                              where wl.RecordStatus == RecordStatus.Active &&
                              wl.Employee.Id == employee.Id &&
                              wl.Type == WorkingLogType.TimeOff &&
                              wl.LogStatus == LogStatus.Approved &&
                              wl.Date >= startDate && wl.Date <= endDate &&
                              wl.TimeOffType.IsPaidTimeOff == false
                              select wl;

            var holidays = from hd in _context.Holidays
                           where hd.From >= startDate &&
                           hd.RecordStatus == RecordStatus.Active
                           select hd;

            //Attendance
            foreach (var e in attendanceTime)
            {
                salaryDays += e.Duration;
                payslip.Attendance += e.Duration;
            }


            foreach (var e in paidTimeOff)
            {
                salaryDays += e.Duration;
                payslip.PaidTimeOff += e.Duration;
            }

            foreach (var e in unPaidTimeOff)
            {
                payslip.UnpaidTimeOff += e.Duration;
            }

            //Holiday
            foreach (var h in holidays)
            {
                if (h.To <= endDate)
                {
                    salaryDays += (h.To - h.From).Days + 1;
                    payslip.HolidayTimeOff += (h.To - h.From).Days + 1;
                }
                else
                {
                    salaryDays += (endDate - h.From).Days + 1;
                    payslip.HolidayTimeOff += (endDate - h.From).Days + 1;
                }

            }

            double totalSalary = positionSalary / 23 * salaryDays;
            payslip.Amount = Convert.ToDecimal(totalSalary);
            _context.PaySlips.Add(payslip);

            return payslip;
        }

        public PayRoll CreatePayroll(DateTime startDate, DateTime endDate, Employee author)
        {
            var employees = _employeeRepostiory.GetWorkingEmployees();
            var payroll = new PayRoll()
            {
                CreatedAt = DateTime.Now,
                Name = $"Bảng lương từ {startDate.ToShortDateString()} đến {endDate.ToShortDateString()}",
                Amount = 0,
                Author = author,
                StartDate = startDate,
                EndDate = endDate,
                RecordStatus = RecordStatus.Active,
                Status = PayRollStatus.Pending,
                EmployeeNo = 0,
                PaySlips = new List<PaySlip>()
            };

            foreach (var em in employees)
            {
                var payslip = CreatePayslip(em, startDate, endDate);
                payroll.PaySlips.Add(payslip);
                payroll.Amount += payslip.Amount;
                payroll.EmployeeNo += 1;
            }

            _context.PayRolls.Add(payroll);
            return payroll;
        }

        public TimeOffType GetTimeOffTypeById(int id)
        {
            return _context.TimeOffTypes.Find(id);
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
            var query = from p in _context.PayRolls
                        where
                             p.RecordStatus == RecordStatus.Active
                        orderby p.EndDate descending
                        select p;

            return query.ToList();
        }

        public PayRoll GetPayRoll(int id)
        {
            return _context.PayRolls.Find(id);
        }

        public List<PaySlip> GetPaySlips(Employee employee)
        {
            var payslips = _context.PaySlips
                .Where(
                e => e.Employee.Id == employee.Id &&
                e.RecordStatus == RecordStatus.Active &&
                e.Status == PaySlipStatus.Confirmed
            ).OrderByDescending(e => e.EndDate);
            return payslips.ToList();
        }

        public List<PaySlip> GetPaySlips(PayRoll payroll)
        {
            return payroll.PaySlips.Where(e => e.RecordStatus == RecordStatus.Active).ToList();
        }

        public void DeletePayroll(PayRoll payroll)
        {
            _context.PaySlips.RemoveRange(payroll.PaySlips);
            _context.PayRolls.Remove(payroll);
        }

        public void ConfirmPayroll(PayRoll payroll)
        {
            payroll.Status = PayRollStatus.Confirmed;
            IEnumerable<PaySlip> payslips = this.GetPaySlips(payroll);
            foreach (var ps in payslips)
            {
                ps.Status = PaySlipStatus.Confirmed;
            }
        }
    }
}
