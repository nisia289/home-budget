import { Component } from '@angular/core';
import { WydatkiService } from '../shared/wydatki.service';
import { WydatekModel } from '../shared/wydatek.model';
import { BudgetService } from '../shared/budget.service';
import { CrudTestService } from '../shared/crud-test.service';
import { CrudTest } from '../shared/crud-test.model';
import { UserBudgetsService } from '../shared/user-budgets.service';

@Component({
  selector: 'app-wydatki',
  templateUrl: './wydatki.component.html',
  styleUrls: ['./wydatki.component.css']
})
export class WydatkiComponent {

  constructor(private wydatkiService: WydatkiService, private budgetService: BudgetService, private userService: CrudTestService,
    public ubService: UserBudgetsService
  ){}

  budgetName: string = '';
  wydatek: WydatekModel = new WydatekModel();
  expenditures: any[] = [];
  groupedExpenditures: any[] = [];
  users: CrudTest[] = [];
  selectedUserId: number = 0;
  roleId = 0;


  ngOnInit(): void {
    this.getExpenditures();
    this.displayUsers();

    this.ubService.roleId$.subscribe(roleId => {
      if(roleId !== null) {
        console.log("Rola", roleId);
        this.roleId = roleId;
      }
    });
  }

  onSubmit() {
    this.wydatkiService.addExpenditure(
      this.wydatek.expenditureId,
      this.wydatek.amount,
      this.wydatek.date,
      this.wydatek.category,
      this.wydatek.description,
      '',
      this.budgetService.newBudgetId,
      this.userService.userID
    ).subscribe(
      (response: any) => {
        console.log('Dodano nowy wydatek:', response);
        this.getExpenditures();
      },
      (error: any) => {
        console.error('Błąd podczas dodawania wydatku:', error);
      }
    );
  }

  getExpenditures() {
    this.budgetService.getBudgetName(this.userService.chosenBudgetID).subscribe(name => {
      this.budgetName = name;
    });

    this.wydatkiService.getExpenditures(this.budgetService.newBudgetId).subscribe((data: any[]) => {
      const grouped = data.reduce((acc, expenditure) => {
        const date = expenditure.date.split('T')[0];
        if (!acc[date]) {
          acc[date] = { expenditures: [], total: 0 }; // Explicitly add total here
        }
        acc[date].expenditures.push(expenditure);
        acc[date].total += expenditure.amount;  // Assume amount is a number and add to total
        return acc;
      }, {});

      this.groupedExpenditures = Object.keys(grouped)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map(date => ({
          date: date,
          expenditures: grouped[date].expenditures,
          total: grouped[date].total  // Now TypeScript knows total exists
        }));
    });
  }

  getExpendituresByUser() {
    this.budgetService.getBudgetName(this.userService.chosenBudgetID).subscribe(name => {
      this.budgetName = name;
    });

    this.wydatkiService.getSpecificUserExpenditures(this.selectedUserId,this.budgetService.newBudgetId).subscribe((data: any[]) => {
      const grouped = data.reduce((acc, expenditure) => {
        const date = expenditure.date.split('T')[0];
        if (!acc[date]) {
          acc[date] = { expenditures: [], total: 0 }; // Explicitly add total here
        }
        acc[date].expenditures.push(expenditure);
        acc[date].total += expenditure.amount;  // Assume amount is a number and add to total
        return acc;
      }, {});

      this.groupedExpenditures = Object.keys(grouped)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map(date => ({
          date: date,
          expenditures: grouped[date].expenditures,
          total: grouped[date].total  // Now TypeScript knows total exists
        }));
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
      this.getExpenditures();
    }
    else
    this.getExpendituresByUser();
  }

}
