import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransakcjeService {

  constructor(public http: HttpClient) { }

  urlToGetPayments: string = 'https://localhost:7216/api/Payments/Budget/';
  urlToGetIncomes: string = 'https://localhost:7216/api/Incomes/Budget/';
  urlToGetExpenditures: string = 'https://localhost:7216/api/Expenditures/Budget/';

  getEverything(budgetId: number): Observable<any[]> {
    const payments$ = this.http.get<any[]>(`${this.urlToGetPayments}${budgetId}`);
    const incomes$ = this.http.get<any[]>(`${this.urlToGetIncomes}${budgetId}`);
    const expenditures$ = this.http.get<any[]>(`${this.urlToGetExpenditures}${budgetId}`);

    return forkJoin({
      payments: payments$,
      incomes: incomes$,
      expenditures: expenditures$
    }).pipe(
      map(data => [
        ...data.payments.map(item => ({ ...item, source: 'payments' })),
        ...data.incomes.map(item => ({ ...item, source: 'incomes' })),
        ...data.expenditures.map(item => ({ ...item, source: 'expenditures' }))
      ])
    );
  }
}
