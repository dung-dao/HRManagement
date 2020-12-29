using HRData.Data;
using HRData.Models;
using HRData.Repositories;
using HRWebApplication.DTO.Statistic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticController : ControllerBase
    {
        private readonly IOrganizationRepository _organizationRepository;
        private readonly IEmployeeRepostiory _employeeRepostiory;
        private readonly ApplicationDbContext _context;

        public StatisticController(
            IOrganizationRepository organizationRepository,
            IEmployeeRepostiory employeeRepostiory,
            ApplicationDbContext context
            )
        {
            _organizationRepository = organizationRepository;
            _employeeRepostiory = employeeRepostiory;
            _context = context;
        }

        [HttpGet("EmployeeNoByUnit")]
        public IEnumerable<EmployeeStatisticItem> GetEmployeeNoByUnitStatistic()
        {
            var units = _organizationRepository.GetActiveRecords();

            foreach (var unit in units)
            {
                yield return new EmployeeStatisticItem()
                {
                    Name = unit.Name,
                    EmployeeNo = _employeeRepostiory.GetEmployeeNoByUnit(unit.Id)
                };
            }
        }

        [HttpGet("EmployeeNoByWorkType")]
        public IEnumerable<EmployeeStatisticItem> GetEmployeeNoByWorkTypeStatistic()
        {
            return from w in _context.WorkType
                   join p in _context.Positions on w.Id equals p.WorkType.Id
                   join e in _context.Employees on p.Employee.Id equals e.Id
                   where p.LeaveDate == null && p.StartDate <= DateTime.Now && DateTime.Now <= p.EndDate
                   group w by w.Name into grp
                   select new EmployeeStatisticItem() { Name = grp.Key, EmployeeNo = grp.Count() };

        }
    }
}
