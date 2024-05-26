import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../shared/budget.service';
import { CrudTestService } from '../shared/crud-test.service';
import { OplatyService } from '../shared/oplaty.service';
import { OplataModel } from '../shared/oplata.model';
import { PaymentStatusService } from '../shared/payment-status.service';
import { CrudTest } from '../shared/crud-test.model';
import { UserBudgetsService } from '../shared/user-budgets.service';

@Component({
  selector: 'app-oplaty',
  templateUrl: './oplaty.component.html',
  styleUrls: ['./oplaty.component.css']
})
export class OplatyComponent implements OnInit {
  constructor(public budgetService: BudgetService, public userService: CrudTestService, public oplatyService: OplatyService,
    public paymentStatus: PaymentStatusService, private ubService: UserBudgetsService
  ){}
  budgetName: string = '';
  oplata: OplataModel = new OplataModel();
  payments: any[] = [];
  groupedPayments: { date: string, payments: any[] }[] = [];
  users: CrudTest[] = [];
  selectedUserId: number = 0;

  ngOnInit(): void {
    this.getPayments();
    this.displayUsers();
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

  getPaymentsByUser() {
    this.budgetService.getBudgetName(this.userService.chosenBudgetID).subscribe(name => {
      this.budgetName = name;
    });
    this.oplatyService.getSpecificUserPayments(this.selectedUserId,this.budgetService.newBudgetId).subscribe((data: any[]) => {
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

  displayUsers(): void {
    this.ubService.getUsersByBudget(this.budgetService.clickedBudget.budgetId)
    .subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.log("Failed to download users from the server", error);
      }
    );
  }

  onSelect(userId: number) {
    this.selectedUserId = userId;
    console.log(this.selectedUserId);
    if(this.selectedUserId == 0) {
      this.getPayments();
    }
    else
    this.getPaymentsByUser();
  }

}
