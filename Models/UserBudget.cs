using System.Data;
using System.Security;

namespace BudzetDomowy.Models
{
    public class UserBudget//tabela posrednia
    {
        public int UserBudgetId { get; set; } // primary key
        public int UserId { get; set; } // foreign key
        public int BudgetId { get; set; } // foreign key
        public int RoleId { get; set; } // foreign key
        public int PermissionId { get; set; } // foreign key

        public User User { get; set; }
        public Budget Budget { get; set; }
        public Role Role { get; set; }
        public Permission Permission { get; set; }
    }
}
