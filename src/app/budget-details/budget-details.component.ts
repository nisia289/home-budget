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
  switcher: boolean = false;
  roleId: number = 0;

  ngOnInit(): void {
      console.log(this.budgetService.newBudgetId);
      console.log(this.budgetService.getSingleBudget(this.budgetService.newBudgetId));
      this.getUserRoleId();

      this.userBudgetService.roleId$.subscribe(roleId => {
        if(roleId !== null) {
          console.log("Rola", roleId);
          this.roleId = roleId;
        }
      });
  }

  submitForm(): void {
    this.switcher = true;
  }

  fetchUserId(): void {
    this.userService.getUserIdByUsername(this.foundUsername).subscribe({
      next: (id) => {
        this.foundUserID = id;
        console.log('User ID:', this.foundUserID);
        this.AddBudgetToInvitedUser();
        this.getUserRoleId();
      },
      error: (err) => {
        console.error('Error fetching user ID:', err);
      }
    });
  }

  AddBudgetToInvitedUser() {
    this.switcher = true;
    this.userBudgetService.postUserBudget(this.budgetService.clickedBudget.budgetId, this.foundUserID, this.roleId).subscribe({
      next: (res) => {
        console.log('Post User Budget Success:', res);
     //    Po pomyślnym wykonaniu operacji przejdź do strony głównej
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
    this.getUserRoleId();
    this.router.navigate(['/konto']);
  }

  selectRole(id: number) {
    this.roleId = id;
    this.fetchUserId();
    this.router.navigate(['/konto']);
  }

  getUserRoleId() {
    this.userBudgetService.getRoleId(this.budgetService.clickedBudget.budgetId, this.userService.userID).subscribe({
      next: (roleId: number) => {
        console.log('Role ID:', roleId);
        this.userBudgetService.setRoleId(roleId);

      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }



}
