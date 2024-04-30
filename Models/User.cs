using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

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

    [JsonIgnore]
    public byte[]? Image { get; set; }

    public ICollection<UserBudget> UserBudgets { get; set; }//wiele<->wielu
}
