﻿using System.Data;
using System.Security;
using System.Text.Json.Serialization;

namespace BudzetDomowy.Models
{
    public class UserBudget//tabela posrednia
    {
        public int UserBudgetId { get; set; } // primary key
        public int UserId { get; set; } // foreign key
        public int BudgetId { get; set; } // foreign key
        public int? RoleId { get; set; } // foreign key, nullable
        public int? PermissionId { get; set; } // foreign key, nullable


    }
}
