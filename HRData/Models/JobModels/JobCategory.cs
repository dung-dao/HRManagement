using System.Collections.Generic;

namespace HRData.Models.JobModels
{
    /// <summary>
    /// Professionals, Technicians, Officials and Managers
    /// </summary>
    public class JobCategory : NamedEntity
    {
        public virtual List<JobTitle> JobTitles { get; set; }
    }
}
