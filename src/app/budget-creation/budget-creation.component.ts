import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../shared/budget.service';
import { Router } from '@angular/router';
import { UserBudgetsService } from '../shared/user-budgets.service';
import { CrudTestService } from '../shared/crud-test.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-budget-creation',
  templateUrl: './budget-creation.component.html',
  styleUrls: ['./budget-creation.component.css']
})
export class BudgetCreationComponent implements OnInit {

  constructor(private budgetService: BudgetService, public router: Router, private userBudgetService: UserBudgetsService, public userService: CrudTestService){}

  name: string = '';
  description: string = '';
  userId: number = this.userService.userID;
  budgetId: number = 0;

  ngOnInit(): void {
      console.log("Userrrrr ID:" + this.userId);
  }

  createBudget() {
    this.budgetService.addBudget(this.name, this.description).pipe(
      tap(res => console.log(res)), // Logowanie pierwszej odpowiedzi
      switchMap(res => {
        // Załóżmy, że `addBudget` zwraca nazwę budżetu, która jest potrzebna do pobrania ID
        return this.budgetService.getUserIdByName(this.name);
      }),
      tap(id => {
        this.budgetId = id; // Przypisanie ID do zmiennej
        console.log('Budget ID:', this.budgetId);
        this.budgetService.setBudgetId(this.budgetId);
      }),
      switchMap(() => {
        // Teraz wykonaj `postUserBudget` używając nowo uzyskanego `budgetId`
        return this.userBudgetService.postUserBudget(this.budgetId, this.userId);
      }),
      tap(res => console.log(res)) // Logowanie odpowiedzi z `postUserBudget`
    ).subscribe({
      next: () => {
        // Po pomyślnym wykonaniu wszystkich operacji przejdź do strony głównej
        this.router.navigate(['/konto']);
        this.budgetService.getBudgets(this.userService.userID); // Pobieranie wszystkich budżetów (można też zrobić przed navigacją)
      },
      error: err => {
        console.error('Error during the budget creation process:', err);
      }
    });
  }

  getUserBudgetId(name: string) {
    this.budgetService.getUserIdByName(name).subscribe({
      next: (id) => {
        this.budgetId = id;
        console.log('Budget ID:', this.budgetId);
      },
      error: (error) => {
        console.error('Error fetching user ID:', error);
      }
    });
  }
  fetchUserId(username: string): void {
    this.userService.getUserIdByUsername(username).subscribe({
      next: (id) => {
        this.userId = id;
        console.log(id);
        console.log('User ID:', this.userId);
      },
      error: (error) => {
        console.error('Error fetching user ID:', error);
      }

    });
  }



}
