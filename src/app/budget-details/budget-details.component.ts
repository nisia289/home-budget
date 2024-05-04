import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../shared/budget.service';
import { Router } from '@angular/router';
import { CrudTestService } from '../shared/crud-test.service';
import { UserBudgetsService } from '../shared/user-budgets.service';

@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.css']
})
export class BudgetDetailsComponent implements OnInit {
  constructor(public budgetService: BudgetService, public router: Router, public userService: CrudTestService,
    public userBudgetService: UserBudgetsService){}

  foundUsername: string = '';
  foundUserID: number = 0;

  ngOnInit(): void {
      console.log(this.budgetService.newBudgetId);
      console.log(this.budgetService.getSingleBudget(this.budgetService.newBudgetId));
  }

  submitForm(): void {
    this.fetchUserId();
  }

  fetchUserId(): void {
    this.userService.getUserIdByUsername(this.foundUsername).subscribe({
      next: (id) => {
        this.foundUserID = id;
        console.log('User ID:', this.foundUserID);
        this.AddBudgetToInvitedUser();
      },
      error: (err) => {
        console.error('Error fetching user ID:', err);
      }
    });
  }

  AddBudgetToInvitedUser() {
    this.userBudgetService.postUserBudget(this.budgetService.clickedBudget.budgetId, this.foundUserID).subscribe({
      next: (res) => {
        console.log('Post User Budget Success:', res);
        // Po pomyślnym wykonaniu operacji przejdź do strony głównej
      },
      error: (err) => {
        console.error('Error during the budget creation process:', err);
        console.log(this.budgetService.clickedBudget.budgetId);
        console.log(this.foundUserID);
      }
    });
  }

  selectBudget() {
    this.userService.setChosenBudgetID(this.budgetService.clickedBudget.budgetId);
  }



}
