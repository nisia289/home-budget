import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { CrudTestService } from '../shared/crud-test.service';
import { TransakcjeService } from '../shared/transakcje.service';
import { DailySummariesModel } from '../shared/daily-summaries.model';
import { BudgetService } from '../shared/budget.service';
import { SummaryModel } from '../shared/summary.model';
import { UserBudgetsService } from '../shared/user-budgets.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],

})
export class MainPageComponent implements OnInit {

  constructor(private router: Router, public service: CrudTestService, private transakcjeService: TransakcjeService,
    private budgetService: BudgetService, private ubService: UserBudgetsService) {}


  przychodyClicked = false;
  wydatkiClicked = false;
  transakcjeClicked = false;
  oplatyClicked = false;
  kontoClicked = false;
  przychodyClicked2 = false;
  currentDate: Date = new Date();
  currentMonthNumber: number = this.currentDate.getMonth() + 1;
  currentYear: number = this.currentDate.getFullYear();
  numberOfDays: number = this.getDaysInMonth(this.currentMonthNumber, this.currentYear);
  lastRow: number[] = [];
  day = 0;
  month: string = this.currentDate.toLocaleString('default', {month: 'long'});
  username: string = this.service.loggedInUsername;
  userId: number = 0;
  dailySummaries: DailySummariesModel[] = [];
  summary: SummaryModel = new SummaryModel;
  refreshPage = false;
  roleId = 0;


  ngOnInit(): void {
    this.ubService.roleId$.subscribe(roleId => {
      if(roleId !== null) {
        console.log("Rola", roleId);
        this.roleId = roleId;
      }
    });
    this.fetchUserId(this.username);
    this.getMonthlyData();
    this.getSummary();
    console.log(this.userId);
    console.log(this.refreshPage);
  }

  toggleOption(optionId: string) {
    switch(optionId) {
      case 'option1' :
        this.przychodyClicked = true;
        this.wydatkiClicked = false;
        this.transakcjeClicked = false;
        this.oplatyClicked = false;
        this.kontoClicked = false;
        console.log(this.przychodyClicked)
        console.log(this.przychodyClicked)
        break;
        case 'option2' :
          this.przychodyClicked = false;
          this.wydatkiClicked = true;
          this.transakcjeClicked = false;
          this.oplatyClicked = false;
          this.kontoClicked = false;

          break;
          case 'option3' :
            this.przychodyClicked = false;
            this.wydatkiClicked = false;
            this.transakcjeClicked = true;
            this.oplatyClicked = false;
            this.kontoClicked = false;
            break;
            case 'option4' :
              this.przychodyClicked = false;
              this.wydatkiClicked = false;
              this.transakcjeClicked = false;
              this.oplatyClicked = true;
              this.kontoClicked = false;
              break;
              case 'option5' :
                this.przychodyClicked = false;
                this.wydatkiClicked = false;
                this.transakcjeClicked = false;
                this.oplatyClicked = false;
                this.kontoClicked = true;
                break;

    }
  }

  getDaysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  generateLastRow() {
    this.day = 29;
    for(let i = 0; i <= this.numberOfDays - 29; i++) {
      this.lastRow[i] = this.day;
      this.day++;
    }
    return this.lastRow;
  }

  goToTest() {
    this.router.navigate(['/crudtest']);
    console.log("test");
  }

  fetchUserId(username: string): void {
    this.service.getUserIdByUsername(username).subscribe({
      next: (id) => {
        this.userId = id;
        console.log('User ID:', this.userId);
      },
      error: (error) => {
        console.error('Error fetching user ID:', error);
      }
    });
  }

  getMonthlyData() {
    this.refreshPage = false;
    console.log(this.refreshPage);
    this.transakcjeService.getMonthlyData(this.currentYear, this.currentMonthNumber, this.budgetService.newBudgetId).subscribe({
      next: (data) => {
        this.dailySummaries = data;
        console.log("Daily summaries"+this.dailySummaries);
        this.refreshPage = true;
        console.log(this.refreshPage);
      },
      error: (error) => {
        console.error('Error fetching monthly data:', error);
      }
    });
  }

  getSummaryForDay(dayNumber: number) {
    const dateString = new Date(this.currentYear, this.currentMonthNumber - 1, dayNumber+1).toISOString().slice(0, 10);
    const summary = this.dailySummaries.find(s => s.day.startsWith(dateString));
    return summary || { day: dayNumber, totalIncome: 0, totalExpenditure: 0 };
  }

  getSummary() {
    this.transakcjeService.getMonthlySummary(this.currentYear,this.currentMonthNumber, this.budgetService.newBudgetId).subscribe({
      next: (data) => {
        this.summary = data;
        console.log('Financial Summary:', this.summary);
      },
      error: (error) => {
        console.error('Error fetching financial summary:', error);
      }
    });
  }

  nextMonth() {
    if(this.currentMonthNumber == 12) {
      this.currentMonthNumber = 1;
      this.currentYear++;
      this.currentDate = new Date(this.currentYear, this.currentMonthNumber - 1);
      this.month = this.currentDate.toLocaleString('default', {month: 'long'});
      this.numberOfDays = this.getDaysInMonth(this.currentMonthNumber, this.currentYear);
      this.getMonthlyData();
      this.getSummary();
      this.lastRow = [];
      this.generateLastRow();
    }
    else {
    this.currentMonthNumber++;
    this.numberOfDays = this.getDaysInMonth(this.currentMonthNumber, this.currentYear);
    this.currentDate = new Date(this.currentYear, this.currentMonthNumber - 1);
    this.month = this.currentDate.toLocaleString('default', {month: 'long'});
    this.getMonthlyData();
    this.getSummary();
    this.lastRow = [];
    this.generateLastRow();
    }
    this.refreshPage = false;
    this.refreshPage = true;
  }

  previousMonth() {
    if(this.currentMonthNumber == 1) {
      this.currentMonthNumber = 12;
      this.currentYear--;
      this.currentDate = new Date(this.currentYear, this.currentMonthNumber - 1);
      this.month = this.currentDate.toLocaleString('default', {month: 'long'});
      this.numberOfDays = this.getDaysInMonth(this.currentMonthNumber, this.currentYear);
      this.getMonthlyData();
      this.getSummary();
      this.lastRow = [];
      this.generateLastRow();
    }
    else {
    this.currentMonthNumber--;
    this.numberOfDays = this.getDaysInMonth(this.currentMonthNumber, this.currentYear);
    this.currentDate = new Date(this.currentYear, this.currentMonthNumber - 1);
    this.month = this.currentDate.toLocaleString('default', {month: 'long'});
    this.getMonthlyData();
    this.getSummary();
    this.lastRow = [];
    this.generateLastRow();
    }
    this.refreshPage = false;
    this.refreshPage = true;
    }

}

