namespace BudzetDomowy.Models
{
    public class Role
    {
        public int RoleId { get; set; } // primary key
        public string RoleName { get; set; }

        public ICollection<UserBudget> UserBudgets { get; set; }
    }
}
