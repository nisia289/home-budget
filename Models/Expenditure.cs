﻿using System.Text.Json.Serialization;

namespace BudzetDomowy.Models
{
    public class Expenditure //wydatek
    {
        public int ExpenditureId { get; set; } // primary key
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public int BudgetId { get; set; } // foreign key

        public int UserId { get; set; }  //foreign key

        [JsonIgnore]
        public Budget Budget { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}
