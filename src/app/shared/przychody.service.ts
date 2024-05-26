import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrzychodyService {

  constructor(public http: HttpClient) { }

  urlToGet: string = 'https://localhost:7216/api/Incomes/Budget/';
  urlToAdd: string = 'https://localhost:7216/api/Incomes';
  urlToGetByUserId: string = 'https://localhost:7216/api/Incomes/user';

  addIncome(incomeId: number, amount: number, date: Date, category: string, description: string,budgetId: number, userId: number): Observable<any> {
    const income = {
      incomeId: incomeId,
      amount: amount,
      date: date,
      category: category,
      description: description,
      budgetId: budgetId,
      userId: userId
    }
    return this.http.post<any>(this.urlToAdd, income);
  }



  getIncomes(budgetId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlToGet}${budgetId}`);
  }

  getSpecificUserIncomes(userId: number, budgetId: number): Observable<any[]> {
    console.log(`${this.urlToGetByUserId}/${userId}/budget/${budgetId}`);
    return this.http.get<any[]>(`${this.urlToGetByUserId}/${userId}/budget/${budgetId}`);

  }
}
