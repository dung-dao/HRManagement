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
        List<Employee> GetActiveEmployee();
        void AddEmployee(Employee employee);
        void Update(Employee employee);
        #endregion

        #region Position
        List<Position> GetPositions(Employee employee);
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
        public List<Employee> GetActiveEmployee() => _context.Employees.Where(e => e.Status != EmployeeStatus.Leaved).ToList();

        public void AddEmployee(Employee employee)
        {
            employee.Status = EmployeeStatus.Pending;
            _context.Employees.Add(employee);
        }

        public void Update(Employee employee)
        {
            _context.Entry(employee).State = EntityState.Modified;
            _context.Entry(employee).Property(e => e.Status).IsModified = false;
        }
        #endregion

        #region Position
        public List<Position> GetPositions(Employee employee) => employee.Positions.OrderBy(po => po.StartDate).ToList();
        public void NewPosition(Employee employee, Position position)
        {
            employee.Status = EmployeeStatus.Working;
            employee.Positions.Add(position);
        }
        #endregion
        public Position GetCurentPosition(Employee employee)
        {
            return (from p in employee.Positions
                    orderby p.StartDate
                    select p).FirstOrDefault();
        }

        public void EmployeeLeave(Employee employee, LeaveDetail detail)
        {
            detail.Position = (from p in employee.Positions
                               orderby p.StartDate
                               select p).FirstOrDefault();

            employee.Status = EmployeeStatus.Leaved;
        }

        public void DeletePosition(Employee employee, Position position)
        {
            employee.Positions.Remove(position);
        }
    }
}
