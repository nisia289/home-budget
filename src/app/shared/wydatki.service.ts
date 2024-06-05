import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WydatkiService {

  constructor(public http: HttpClient) { }

  urlToGet: string = 'https://localhost:7216/api/Expenditures/Budget/';
  urlToAdd: string = 'https://localhost:7216/api/Expenditures';
  urlToGetByUserId: string = 'https://localhost:7216/api/Expenditures/user';

  addExpenditure(expenditureId: number, amount: number, date: Date, category: string, description: string, supplier: string, budgetId: number, userId: number): Observable<any> {
    const expenditure = {
      expenditureId: expenditureId,
      amount: amount,
      date: date,
      category: category,
      description: description,
      supplier: supplier,
      budgetId: budgetId,
      userId: userId
    }
    return this.http.post<any>(this.urlToAdd, expenditure);
  }



  getExpenditures(budgetId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlToGet}${budgetId}`);
  }

  getSpecificUserExpenditures(userId: number, budgetId: number): Observable<any[]> {
    console.log(`${this.urlToGetByUserId}/${userId}/budget/${budgetId}`);
    return this.http.get<any[]>(`${this.urlToGetByUserId}/${userId}/budget/${budgetId}`);
  }
}
