import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { CrudTestService } from '../shared/crud-test.service';
import { TransakcjeService } from '../shared/transakcje.service';
import { DailySummariesModel } from '../shared/daily-summaries.model';
import { BudgetService } from '../shared/budget.service';
import { SummaryModel } from '../shared/summary.model';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],

})
export class MainPageComponent implements OnInit {

  constructor(private router: Router, public service: CrudTestService, private transakcjeService: TransakcjeService,
    private budgetService: BudgetService) {}


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


  ngOnInit(): void {
    this.fetchUserId(this.username);
    this.getMonthlyData();
    this.getSummary();
    console.log(this.userId);
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
    this.transakcjeService.getMonthlyData(this.currentYear, this.currentMonthNumber, this.budgetService.newBudgetId).subscribe({
      next: (data) => {
        this.dailySummaries = data;
        console.log(this.dailySummaries);
      },
      error: (error) => {
        console.error('Error fetching monthly data:', error);
      }
    });
  }

  getSummaryForDay(dayNumber: number) {
    const dateString = new Date(this.currentYear, this.currentMonthNumber - 1, dayNumber).toISOString().slice(0, 10);
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







}
