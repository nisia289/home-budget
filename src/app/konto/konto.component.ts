import { Component } from '@angular/core';
import { CrudTestService } from '../shared/crud-test.service';
import { BudgetService } from '../shared/budget.service';

@Component({
  selector: 'app-konto',
  templateUrl: './konto.component.html',
  styleUrls: ['./konto.component.css']
})
export class KontoComponent {
  constructor(public userService: CrudTestService, public budgetService: BudgetService) {}

  username: string = this.userService.loggedInUsername;

  addBudget() {
    this.budgetService.addBudget('aaa', 'bbb').subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
       console.log(err);
      }
    );
  }
}

