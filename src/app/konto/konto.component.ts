import { Component, OnInit } from '@angular/core';
import { CrudTestService } from '../shared/crud-test.service';
import { BudgetService } from '../shared/budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-konto',
  templateUrl: './konto.component.html',
  styleUrls: ['./konto.component.css']
})
export class KontoComponent implements OnInit{
  constructor(public userService: CrudTestService, public budgetService: BudgetService, public router: Router) {}

  username: string = this.userService.loggedInUsername;

  addBudget() {
    this.router.navigate(['/budget-creation']);
  }

  ngOnInit(): void {
    this.budgetService.getBudgets(this.userService.userID);
  }

}

