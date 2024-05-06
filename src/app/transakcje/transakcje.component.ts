import { Component, OnInit } from '@angular/core';
import { TransakcjeService } from '../shared/transakcje.service';
import { TransakcjaModel } from '../shared/transakcja.model';
import { BudgetService } from '../shared/budget.service';
import { CrudTestService } from '../shared/crud-test.service';
@Component({
  selector: 'app-transakcje',
  templateUrl: './transakcje.component.html',
  styleUrls: ['./transakcje.component.css']
})
export class TransakcjeComponent implements OnInit {

  constructor(private transakcjeService: TransakcjeService, private budgetService: BudgetService, private userService: CrudTestService){}

  ngOnInit(): void {
      this.getTransactions();
  }

  budgetName: string = '';
  transakcja: TransakcjaModel = new TransakcjaModel();
  transactions: any[] = [];
  groupedTransactions: { date: string, transactions: any[] }[] = [];

  getTransactions() {
    this.budgetService.getBudgetName(this.userService.chosenBudgetID).subscribe(name => {
      this.budgetName = name;
    });
    this.transakcjeService.getEverything(this.budgetService.newBudgetId).subscribe((data: any[]) => {
      const grouped = data.reduce((acc, transakcja) => {
        const date = transakcja.date.split('T')[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(transakcja);
        return acc;
      }, {});

      this.groupedTransactions = Object.keys(grouped)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map(date => ({ date, transactions: grouped[date] }));
    });
  }
}
