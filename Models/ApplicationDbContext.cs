using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

namespace BudzetDomowy.Models
{
   public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        //protected ApplicationDbContext() {}

        public DbSet<User> Users { get; set; }
        public DbSet<Budget> Budgets { get; set; }

        public DbSet<UserBudget> UserBudgets { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Income> Incomes { get; set; }

        public DbSet<Expenditure> Expenditures { get; set; }
        // a nie robic ich public virtual???
        public DbSet<Payment> Payments { get; set; }
     

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {//connection string do bazy danych
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=BudgetDatabase;Trusted_Connection=True;");
            }
        }





    }

}
