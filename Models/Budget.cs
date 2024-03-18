namespace BudzetDomowy.Models
{
    public class Budget
    {
        public int BudgetId { get; set; } // primary key
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<UserBudget> UserBudgets { get; set; }
        public ICollection<Income> Incomes { get; set; }
        public ICollection<Expenditure> Expenditures { get; set; }
        public ICollection<Payment> Payments { get; set; }


    }
}
