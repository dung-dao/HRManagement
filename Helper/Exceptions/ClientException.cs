using System;
using System.Collections.Generic;
using System.Text;

namespace Helper.Exceptions
{
    public class ClientException : Exception
    {
        public ClientException() : base("BadRequest")
        {

        }
    }
}
