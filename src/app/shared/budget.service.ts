import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) { }

  url: string = 'https://localhost:7216/api/budgets';

  addBudget(name: string, description: string) {
    const budgetData = {
      budgetId: 0,
      name: name,
      description: description,
      userBudgets: [],
      incomes: [],
      expenditures: [],
      payments: []
    };
    return this.http.post(this.url, budgetData);
  }
}
