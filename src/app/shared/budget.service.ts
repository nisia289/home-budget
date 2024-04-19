import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BudgetModel } from './budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) { }

  url: string = 'https://localhost:7216/api/budgets';
  urlToGetIdByName: string = 'https://localhost:7216/api/Budgets/byname';
  urlToGetBudgetsById: string = 'https://localhost:7216/api/UserBudgets/api/budgets/byuser';
  list: BudgetModel[] = [];

  budgetData: BudgetModel = new BudgetModel();

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

  getBudgets(id: number) {
    const url = `${this.urlToGetBudgetsById}/${id}`; // Zmodyfikowany URL z przekazanym id
    this.http.get<BudgetModel[]>(url) // Zakładam, że oczekiwany typ to BudgetModel[]
    .subscribe({
        next: res => {
            this.list = res; // Przypisanie odpowiedzi do listy, zakładając, że odpowiedź jest już typu BudgetModel[]
            console.log(res);
        },
        error: err => {
            console.error('Error fetching budgets:', err);
        }
    });
}

  getUserIdByName(name: string): Observable<number> {
    return this.http.get<number>(`${this.urlToGetIdByName}/${name}`);
  }


}
