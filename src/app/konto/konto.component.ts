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
  idd: number = 0;
  userPhoto: any;

  addBudget() {
    this.router.navigate(['/budget-creation']);
  }

  goToBudgetDetails() {
    this.router.navigate(['/budget-details']);
  }

  ngOnInit(): void {
    this.budgetService.getBudgets(this.userService.userID);
    this.getUserPhoto();
  }

  printInfo(budget: any, id: number): void {
    console.log(`ID: ${id}, Name: ${budget.name}, Description: ${budget.description || 'No description available'}`);
    this.budgetService.setBudgetId(id);
    this.goToBudgetDetails();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.userService.uploadFile(file, this.userService.userID);
    }
  }

  getUserPhoto() {
    this.userService.getUserPhoto(this.userService.userID)
      .subscribe((data: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.userPhoto = reader.result;
          this.getUserPhoto();
        }
        reader.readAsDataURL(data);
      }, error => {
        console.error('Error fetching user photo:', error);
      });
  }


}

