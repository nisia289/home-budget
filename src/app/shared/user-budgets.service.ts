import { Injectable } from '@angular/core';
import { UserBudgetsModel } from './user-budgets.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CrudTest } from './crud-test.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserBudgetsService {

  url: string = 'https://localhost:7216/api/UserBudgets';
  urlToDisplayBudgets: string = 'http://localhost:5000/api/budgets/byuser';
  urlToGetUsers: string = 'https://localhost:7216/api/UserBudgets';
  userBudgetData : UserBudgetsModel = new UserBudgetsModel();
  constructor(private http: HttpClient ) { }

  postUserBudget(budgetID: number, userID: number) {
    const userBudgetDataToSend = {
      userBudgetID: 0,
      userId: userID,
      budgetId: budgetID,
      roleId: null,
      persmissionId: null
    };
    console.log(userID);
    console.log(budgetID);
    return this.http.post(this.url, userBudgetDataToSend);
  }

  getUsersByBudget(budgetId: number): Observable<CrudTest[]> {
    return this.http.get<CrudTest[]>(`${this.urlToGetUsers}/${budgetId}/users`)
  }


}
