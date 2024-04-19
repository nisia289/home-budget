namespace BudzetDomowy.Models
{
    public class UserBudgetResponse
    {
        public int UserBudgetId { get; set; }
        public int UserId { get; set; }
        public int BudgetId { get; set; }
        public User User { get; set; }
        public Budget Budget { get; set; }
        public Role Role { get; set; }
        public Permission Permission { get; set; }
    }
}
