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
    public interface IEmployeeRepostiory
    {
        #region Employee
        List<Employee> GetActiveEmployees();
        List<Employee> GetInactiveEmployees();
        Employee GetById(int id);
        void AddEmployee(Employee employee);
        void Update(Employee employee);
        void Delete(Employee employee);
        EmployeeStatus GetEmployeeStatus(Employee employee);
        int GetEmployeeNoByUnit(int unitId);

        IEnumerable<Employee> GetWorkingEmployees();
        #endregion

        #region Position
        List<Position> GetPositions(Employee employee);
        Position GetPositionById(int positionId);
        Position GetCurentPosition(Employee employee);
        void NewPosition(Employee employee, Position position);
        void EmployeeLeave(Employee employee, Position position);
        void DeletePosition(Employee employee, Position position);
        #endregion
    }
    public class EmployeeRepostiory : Repository, IEmployeeRepostiory
    {
        public EmployeeRepostiory(ApplicationDbContext context) : base(context)
        {
        }

        #region Profile
        public List<Employee> GetActiveEmployees()
        {
            return _context.Employees.Where(e => e.RecordStatus == RecordStatus.Active).ToList();
        }

        public Employee GetById(int id) => _context.Employees.Find(id);

        public void AddEmployee(Employee employee)
        {
            //employee.Status = EmployeeStatus.Pending;
            employee.RecordStatus = RecordStatus.Active;
            _context.Employees.Add(employee);
        }

        public void Update(Employee employee)
        {
            _context.Entry(employee).State = EntityState.Modified;
            //_context.Entry(employee).Property(e => e.Status).IsModified = false;
            _context.Entry(employee).Property(e => e.RecordStatus).IsModified = false;
        }

        public void Delete(Employee employee)
        {
            employee.RecordStatus = RecordStatus.InActive;
        }
        #endregion

        #region Position
        public List<Position> GetPositions(Employee employee)
        {
            return employee.Positions
                .Where(e => e.RecordStatus == RecordStatus.Active)
                .OrderBy(po => po.StartDate).ToList();
        }

        public void NewPosition(Employee employee, Position position)
        {
            //Leave old position
            var currentPos = GetCurentPosition(employee);
            if (currentPos is not null)
            {
                currentPos.LeaveDate = DateTime.Now;
            }

            //Create new position
            position.RecordStatus = RecordStatus.Active;
            employee.Positions.Add(position);
        }


        public Position GetCurentPosition(Employee employee)
        {
            return employee.Positions.Find(p => p.LeaveDate == null || p.LeaveDate <= DateTime.Now);
        }


        public void EmployeeLeave(Employee employee, Position data)
        {
            var pos = employee.Positions.Find(p => p.Id == data.Id && p.RecordStatus == RecordStatus.Active);
            pos.LeaveDate = data.LeaveDate;
            pos.LeaveReason = data.LeaveReason;
        }

        public void DeletePosition(Employee employee, Position position)
        {
            var pos = employee.Positions.Find(p => p.Id == position.Id);
            pos.RecordStatus = RecordStatus.InActive;
        }

        public Position GetPositionById(int positionId)
        {
            return _context.Positions.Find(positionId);
        }
        #endregion

        public List<Employee> GetInactiveEmployees()
        {
            return _context.Employees.Where(e => e.RecordStatus == RecordStatus.Active).ToList();
        }

        public EmployeeStatus GetEmployeeStatus(Employee employee)
        {
            if (employee.Positions.Count == 0)
                return EmployeeStatus.Pending;
            var positions = employee.Positions.Where(
                p => p.RecordStatus == RecordStatus.Active &&
                p.StartDate <= DateTime.Now && (p.LeaveDate == null || p.LeaveDate >= DateTime.Now)
                );
            ////var pos = from p in employee.Positions
            ////          where (
            ////          (p.StartDate <= DateTime.Now && DateTime.Now <= p.EndDate && p.LeaveDate is null)
            ////          || p.LeaveDate is not null && p.LeaveDate >= DateTime.Now && p.StartDate <= DateTime.Now && DateTime.Now <= p.EndDate)
            ////          && p.RecordStatus == RecordStatus.Active
            ////          select p;
            //if (pos.Count() > 0)
            //    return EmployeeStatus.Working;
            //return EmployeeStatus.Leaved;
            return positions.Any() ? EmployeeStatus.Working : EmployeeStatus.Leaved;
        }

        public int GetEmployeeNoByUnit(int unitId)
        {
            if (_context.OrganizationUnits.Find(unitId) is null) return 0;
            return _context.Employees
                .ToList() // NOTE: might hurt the performance
                .Where(employee => GetEmployeeStatus(employee) == EmployeeStatus.Working)
                .Count(employee => GetCurentPosition(employee).Unit.Id == unitId);
        }

        public IEnumerable<Employee> GetWorkingEmployees()
        {
            var now = DateTime.Now;

            return from e in _context.Employees
                   join pos in _context.Positions on e.Id equals pos.Employee.Id
                   where
                       e.RecordStatus == RecordStatus.Active &&
                       pos.StartDate < DateTime.Now &&
                       pos.EndDate >= DateTime.Now &&
                       pos.LeaveDate == null
                   select e;
        }
    }
}
