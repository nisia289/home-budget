import { Component } from '@angular/core';
import { WydatkiService } from '../shared/wydatki.service';
import { WydatekModel } from '../shared/wydatek.model';
import { BudgetService } from '../shared/budget.service';
import { CrudTestService } from '../shared/crud-test.service';

@Component({
  selector: 'app-wydatki',
  templateUrl: './wydatki.component.html',
  styleUrls: ['./wydatki.component.css']
})
export class WydatkiComponent {

  constructor(private wydatkiService: WydatkiService, private budgetService: BudgetService, private userService: CrudTestService){}

  budgetName: string = '';
  wydatek: WydatekModel = new WydatekModel();
  expenditures: any[] = [];
  groupedExpenditures: { date: string, expenditures: any[] }[] = [];


  ngOnInit(): void {
    this.getExpenditures();
  }

  onSubmit() {
    this.wydatkiService.addExpenditure(
      this.wydatek.expenditureId,
      this.wydatek.amount,
      this.wydatek.date,
      this.wydatek.category,
      this.wydatek.description,
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
          acc[date] = [];
        }
        acc[date].push(expenditure);
        return acc;
      }, {});

      this.groupedExpenditures = Object.keys(grouped)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map(date => ({ date, expenditures: grouped[date] }));
    });
  }

}
