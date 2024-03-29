﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HRData.Models.Organization
{
    public class Branch : EntityBase
    {
        [MaxLength(100)]
        public string Name { get; set; }
        [MaxLength(1000)]
        public string Address { get; set; }
        [MaxLength(20)]
        public string Status { get; set; }
        public virtual List<OrganizationUnit> Organization { get; set; }
    }
}
