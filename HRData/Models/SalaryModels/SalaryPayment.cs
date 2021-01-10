using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRData.Models.SalaryModels
{
    public enum SalaryPaymentStatus
    {
        Temporary,
        Confirmed
    }
    public class SalaryPayment : EntityBase
    {
        public decimal Amount { get; set; }
        public DateTime Period { get; set; }
        public SalaryPaymentStatus PaymentStatus { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
