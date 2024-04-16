using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace BudzetDomowy.Models;

public class User
{

    public User()
    {
        UserBudgets = new HashSet<UserBudget>();
    }


    public int UserId { get; set; } // primary key
    public string Username { get; set; }
    public string Password { get; set; }

    public ICollection<UserBudget> UserBudgets { get; set; }//wiele<->wielu
}
