using System.Text.Json.Serialization;

namespace BudzetDomowy.Models
{
    public class Payment
    {
        public int PaymentId { get; set; } // primary key
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }

        public string Supplier { get; set; } //dostawca
        public int BudgetId { get; set; } // foreign key

        public int UserId { get; set; } //foreign key
    }
}
