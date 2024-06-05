import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../shared/budget.service';
import { CrudTestService } from '../shared/crud-test.service';
import { PrzychodModel } from '../shared/przychod.model';
import { PrzychodyService } from '../shared/przychody.service';
import { UserBudgetsService } from '../shared/user-budgets.service';
import { CrudTest } from '../shared/crud-test.model';

@Component({
  selector: 'app-przychody',
  templateUrl: './przychody.component.html',
  styleUrls: ['./przychody.component.css']
})
export class PrzychodyComponent implements OnInit {
  constructor(public budgetService: BudgetService, public userService: CrudTestService, public przychodyService: PrzychodyService, public ubService: UserBudgetsService){}
  budgetName: string = '';
  przychod: PrzychodModel = new PrzychodModel();
  incomes: any[] = [];
  groupedIncomes: any[] = [];
  users: CrudTest[] = [];
  selectedUserId: number = 0;
  roleId = 0;


  ngOnInit(): void {
   this.getIncomes();
   this.displayUsers();
   this.ubService.roleId$.subscribe(roleId => {
    if(roleId !== null) {
      console.log("Rola", roleId);
      this.roleId = roleId;
    }
  });
  }

  onSubmit() {
    this.przychodyService.addIncome(
      this.przychod.incomeId,
      this.przychod.amount,
      this.przychod.date,
      this.przychod.category,
      this.przychod.description,
      this.budgetService.newBudgetId,
      this.userService.userID
    ).subscribe(
      (response: any) => {
        console.log('Dodano nowy przychód:', response);
        this.getIncomes();
      },
      (error: any) => {
        console.error('Błąd podczas dodawania przychodu:', error);
      }
    );
  }

  getIncomes() {
    this.budgetService.getBudgetName(this.userService.chosenBudgetID).subscribe(name => {
      this.budgetName = name;
    });

    this.przychodyService.getIncomes(this.budgetService.newBudgetId).subscribe((data: any[]) => {
      const grouped = data.reduce((acc, income) => {
        const date = income.date.split('T')[0];
        if (!acc[date]) {
          acc[date] = { incomes: [], total: 0 }; // Explicitly add total here
        }
        acc[date].incomes.push(income);
        acc[date].total += income.amount;  // Assume amount is a number and add to total
        return acc;
      }, {});

      this.groupedIncomes = Object.keys(grouped)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map(date => ({
          date: date,
          incomes: grouped[date].incomes,
          total: grouped[date].total  // Now TypeScript knows total exists
        }));
    });
  }

  getIncomesByUser() {
    this.budgetService.getBudgetName(this.userService.chosenBudgetID).subscribe(name => {
      this.budgetName = name;
    });

    this.przychodyService.getSpecificUserIncomes(this.selectedUserId,this.budgetService.newBudgetId).subscribe((data: any[]) => {
      const grouped = data.reduce((acc, income) => {
        const date = income.date.split('T')[0];
        if (!acc[date]) {
          acc[date] = { incomes: [], total: 0 }; // Explicitly add total here
        }
        acc[date].incomes.push(income);
        acc[date].total += income.amount;  // Assume amount is a number and add to total
        return acc;
      }, {});

      this.groupedIncomes = Object.keys(grouped)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map(date => ({
          date: date,
          incomes: grouped[date].incomes,
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
      this.getIncomes();
    }
    else
    this.getIncomesByUser();
  }

}
