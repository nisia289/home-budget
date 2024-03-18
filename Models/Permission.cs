namespace BudzetDomowy.Models
{
    public class Permission
    {
        public int PermissionId { get; set; } // primary key
        public string PermissionName { get; set; }

        public ICollection<UserBudget> UserBudgets { get; set; }
    }
}
