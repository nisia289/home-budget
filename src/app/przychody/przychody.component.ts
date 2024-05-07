import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../shared/budget.service';
import { CrudTestService } from '../shared/crud-test.service';
import { PrzychodModel } from '../shared/przychod.model';
import { PrzychodyService } from '../shared/przychody.service';

@Component({
  selector: 'app-przychody',
  templateUrl: './przychody.component.html',
  styleUrls: ['./przychody.component.css']
})
export class PrzychodyComponent implements OnInit {
  constructor(public budgetService: BudgetService, public userService: CrudTestService, public przychodyService: PrzychodyService){}
  budgetName: string = '';
  przychod: PrzychodModel = new PrzychodModel();
  incomes: any[] = [];
  groupedIncomes: any[] = [];



  ngOnInit(): void {
   this.getIncomes();
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

}
