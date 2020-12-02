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
        void AddEmployee(Employee employee);
        void Update(Employee employee);
        void Delete(Employee employee);
        EmployeeStatus GetEmployeeStatus(Employee employee);
        int GetEmployeeNoByUnit(int unitId);
        #endregion

        #region Position
        List<Position> GetPositions(Employee employee);
        Position GetPositionById(Employee employee, int positionId);
        Position GetCurentPosition(Employee employee);
        void NewPosition(Employee employee, Position position);
        void EmployeeLeave(Employee employee, LeaveDetail detail);
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
        public List<Position> GetPositions(Employee employee) => employee.Positions.OrderBy(po => po.StartDate).ToList();
        public void NewPosition(Employee employee, Position position)
        {
            var currentPos = GetCurentPosition(employee);
            if (currentPos is not null && currentPos.EndDate > position.StartDate)
                currentPos.EndDate = position.StartDate;

            //employee.Status = EmployeeStatus.Working;
            position.RecordStatus = RecordStatus.Active;
            employee.Positions.Add(position);
        }


        public Position GetCurentPosition(Employee employee)
        {
            return (from p in employee.Positions
                    orderby p.StartDate descending
                    select p).FirstOrDefault();
        }

        public void EmployeeLeave(Employee employee, LeaveDetail detail)
        {
            var position = GetCurentPosition(employee);

            //Todo: Fix later
            position.EndDate = detail.Date;

            position.LeaveDetail = detail;
            //employee.Status = EmployeeStatus.Leaved;
        }

        public void DeletePosition(Employee employee, Position position)
        {
            employee.Positions.Remove(position);
        }

        public Position GetPositionById(Employee employee, int positionId)
        {
            return (from p in employee.Positions
                    where p.Id == positionId
                    select p
             ).FirstOrDefault();
        }
        #endregion

        public List<Employee> GetInactiveEmployees()
        {
            return _context.Employees.Where(e => e.RecordStatus == RecordStatus.Active).ToList();
        }

        public EmployeeStatus GetEmployeeStatus(Employee employee)
        {
            var currentPos = GetCurentPosition(employee);
            if (currentPos is null)
                return EmployeeStatus.Pending;

            if (!EntityBase.Exists(currentPos.LeaveDetail))
                return EmployeeStatus.Working;

            return EmployeeStatus.Leaved;
        }

        public int GetEmployeeNoByUnit(int unitId)
        {
            if (_context.OrganizationUnits.Find(unitId) is null) return 0;
            return _context.Employees
                .ToList() // NOTE: might hurt hard the performance
                .Where(employee => GetEmployeeStatus(employee) == EmployeeStatus.Working)
                .Count(employee => GetCurentPosition(employee).Unit.Id == unitId);
        }
    }
}
