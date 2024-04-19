import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { CrudTestService } from '../shared/crud-test.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],

})
export class MainPageComponent implements OnInit {

  constructor(private router: Router, public service: CrudTestService) {}

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


  ngOnInit(): void {
    this.fetchUserId(this.username);
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



}
