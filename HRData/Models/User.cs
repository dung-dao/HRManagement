﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Models
{
    public class User : IdentityUser
    {
        public virtual Employee Employee { get; set; }
    }
}
