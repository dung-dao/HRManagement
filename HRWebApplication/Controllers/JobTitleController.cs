using AutoMapper;
using HRData.Data;
using HRData.Models.JobModels;
using HRWebApplication.Controllers.Base;
using HRWebApplication.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRWebApplication.Controllers
{
    [Authorize(Roles = "Admin,Manager")]
    public class JobTitleController : GenericController<JobTitle, JobTitleDTO>
    {
        public JobTitleController(ApplicationDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public override async Task<ActionResult<JobTitleDTO>> Post(JobTitleDTO data)
        {
            JobTitle jobTitle = _mapper.Map<JobTitle>(data);
            jobTitle.RecordStatus = HRData.Models.RecordStatus.Active;

            var jobcategory = _context.JobCategories.Find(data.JobCategory.Id);
            if (jobcategory is null)
                return BadRequest();

            jobTitle.JobCategory = jobcategory;
            _context.JobTitles.Add(jobTitle);

            await _context.SaveChangesAsync();
            return CreatedAtAction("GetById", new { id = jobTitle.Id }, _mapper.Map<JobTitleDTO>(jobTitle));
        }
    }
}
