import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OplatyService {

  constructor(public http: HttpClient) { }

  urlToGet: string = 'https://localhost:7216/api/Payments/Budget/';
  urlToAdd: string = 'https://localhost:7216/api/Payments';
  urlToGetByUserId = 'https://localhost:7216/api/Payments/user';

  addPayments(paymentId: number, amount: number, date: Date, category: string, description: string, supplier: string, status: string, budgetId: number, userId: number): Observable<any> {
    const payment = {
      paymentId: paymentId,
      amount: amount,
      date: date,
      category: category,
      description: description,
      supplier: supplier,
      status: status,
      budgetId: budgetId,
      userId: userId
    }
    return this.http.post<any>(this.urlToAdd, payment);
  }



  getPayments(budgetId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlToGet}${budgetId}`);
  }

  getSpecificUserPayments(userId: number, budgetId: number): Observable<any[]> {
    console.log(`${this.urlToGetByUserId}/${userId}/budget/${budgetId}`);
    return this.http.get<any[]>(`${this.urlToGetByUserId}/${userId}/budget/${budgetId}`);
  }
}
