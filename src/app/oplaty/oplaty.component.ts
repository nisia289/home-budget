import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../shared/budget.service';
import { CrudTestService } from '../shared/crud-test.service';
import { OplatyService } from '../shared/oplaty.service';
import { OplataModel } from '../shared/oplata.model';
import { PaymentStatusService } from '../shared/payment-status.service';
import { CrudTest } from '../shared/crud-test.model';
import { UserBudgetsService } from '../shared/user-budgets.service';
import { WydatkiService } from '../shared/wydatki.service';
import { WydatekModel } from '../shared/wydatek.model';

@Component({
  selector: 'app-oplaty',
  templateUrl: './oplaty.component.html',
  styleUrls: ['./oplaty.component.css']
})
export class OplatyComponent implements OnInit {
  constructor(public budgetService: BudgetService, public userService: CrudTestService, public oplatyService: OplatyService,
    public paymentStatus: PaymentStatusService, public ubService: UserBudgetsService, private wydatkiService: WydatkiService
  ){}
  budgetName: string = '';
  oplata: OplataModel = new OplataModel();
  payments: any[] = [];
  groupedPayments: { date: string, payments: any[] }[] = [];
  users: CrudTest[] = [];
  selectedUserId: number = 0;
  roleId = 0;
  wydatek: WydatekModel = new WydatekModel();

  ngOnInit(): void {
    this.getPayments();
    this.displayUsers();

    this.ubService.roleId$.subscribe(roleId => {
      if(roleId !== null) {
        console.log("Rola", roleId);
        this.roleId = roleId;
      }
    });
  }

  onSubmit() {
    this.oplatyService.addPayments(
      this.oplata.paymentId,
      this.oplata.amount,
      this.oplata.date,
      this.oplata.category,
      this.oplata.description,
      this.oplata.supplier,
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

  completePayment(payment: any) {
    this.wydatek.expenditureId = 0;
    this.wydatek.amount = payment.amount;
    this.wydatek.budgetId = this.budgetService.clickedBudget.budgetId;
    this.wydatek.category = payment.category;
    this.wydatek.date = payment.date;
    this.wydatek.description = payment.description;
    this.wydatek.supplier = payment.supplier;
    this.wydatek.userId = this.userService.userID;

    this.wydatkiService.addExpenditure(
      this.wydatek.expenditureId,
      this.wydatek.amount,
      this.wydatek.date,
      this.wydatek.category,
      this.wydatek.description,
      this.wydatek.supplier,
      this.budgetService.newBudgetId,
      this.userService.userID
    ).subscribe(
      (response: any) => {
        console.log('Dodano nowy wydatek:', response);
        this.removePayment(payment.paymentId);
        this.getPayments();
      },
      (error: any) => {
        console.error('Błąd podczas dodawania wydatku:', error);
      }
    );
  }

  removePayment(paymentId: number): void {
    this.oplatyService.deletePayment(paymentId).subscribe(
      () => {
        console.log('Płatność została usunięta.'); // Reakcja na sukces
      },
      (error: any) => {
        console.error('Wystąpił błąd podczas usuwania płatności:', error); // Obsługa błędu
      }
    );
  }

}
