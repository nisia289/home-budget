import { Injectable } from '@angular/core';
import { UserBudgetsModel } from './user-budgets.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CrudTest } from './crud-test.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserBudgetsService {

  url: string = 'https://localhost:7216/api/UserBudgets';
  urlToDisplayBudgets: string = 'http://localhost:5000/api/budgets/byuser';
  urlToGetUsers: string = 'https://localhost:7216/api/UserBudgets';
  urlToGetRoleId: string = 'https://localhost:7216/UserBudget/RoleId?budgetId';
  userBudgetData : UserBudgetsModel = new UserBudgetsModel();
  private roleIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public roleId$ = this.roleIdSubject.asObservable();
  constructor(private http: HttpClient ) { }

  postUserBudget(budgetID: number, userID: number, roleID: number) {
    const userBudgetDataToSend = {
      userBudgetID: 0,
      userId: userID,
      budgetId: budgetID,
      roleId: roleID
    };
    console.log(userID);
    console.log(budgetID);
    return this.http.post(this.url, userBudgetDataToSend);
  }

  getUsersByBudget(budgetId: number): Observable<CrudTest[]> {
    return this.http.get<CrudTest[]>(`${this.urlToGetUsers}/${budgetId}/users`);
  }

  getRoleId(budgetId: number, userId: number): Observable<number> {
    return this.http.get<number>(`https://localhost:7216/UserBudget/RoleId?budgetId=${budgetId}&userId=${userId}`);
}

setRoleId(id: number) {
  this.roleIdSubject.next(id);
}
}
