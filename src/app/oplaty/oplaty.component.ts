import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../shared/budget.service';
import { CrudTestService } from '../shared/crud-test.service';
import { OplatyService } from '../shared/oplaty.service';
import { OplataModel } from '../shared/oplata.model';

@Component({
  selector: 'app-oplaty',
  templateUrl: './oplaty.component.html',
  styleUrls: ['./oplaty.component.css']
})
export class OplatyComponent implements OnInit {
  constructor(public budgetService: BudgetService, public userService: CrudTestService, public oplatyService: OplatyService){}
  budgetName: string = '';
  oplata: OplataModel = new OplataModel();
  payments: any[] = [];
  groupedPayments: { date: string, payments: any[] }[] = [];

  ngOnInit(): void {
    this.getPayments();
  }

  onSubmit() {
    this.oplatyService.addPayments(
      this.oplata.paymentId,
      this.oplata.amount,
      this.oplata.date,
      this.oplata.category,
      this.oplata.description,
      this.oplata.supplier,
      this.oplata.status,
      this.budgetService.newBudgetId,
      this.userService.userID
    ).subscribe(
      (response: any) => {
        console.log('Dodano nową opłatę:', response);
        this.getPayments();
      },
      (error: any) => {
        console.error('Błąd podczas dodawania opłaty:', error);
      }
    );
  }

  getPayments() {
    this.budgetService.getBudgetName(this.userService.chosenBudgetID).subscribe(name => {
      this.budgetName = name;
    });
    this.oplatyService.getPayments(this.budgetService.newBudgetId).subscribe((data: any[]) => {
      const grouped = data.reduce((acc, payment) => {
        const date = payment.date.split('T')[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(payment);
        return acc;
      }, {});

      this.groupedPayments = Object.keys(grouped)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map(date => ({ date, payments: grouped[date] }));
    });
  }

}
