import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private router: Router) {}

  przychodyClicked = false;
  wydatkiClicked = false;
  transakcjeClicked = false;
  oplatyClicked = false;
  kontoClicked = false;
  mainpageClicked = false;

  toggleOption(optionId: string) {
    switch(optionId) {
      case 'option1' :
        this.przychodyClicked = true;
        this.wydatkiClicked = false;
        this.transakcjeClicked = false;
        this.oplatyClicked = false;
        this.kontoClicked = false;
        this.mainpageClicked = false;
        this.router.navigate(['/przychody']);

        break;
        case 'option2' :
          this.przychodyClicked = false;
          this.wydatkiClicked = true;
          this.transakcjeClicked = false;
          this.oplatyClicked = false;
          this.kontoClicked = false;
          this.mainpageClicked = false;
          this.router.navigate(['/wydatki']);

          break;
          case 'option3' :
            this.przychodyClicked = false;
            this.wydatkiClicked = false;
            this.transakcjeClicked = true;
            this.oplatyClicked = false;
            this.kontoClicked = false;
            this.mainpageClicked = false;
            this.router.navigate(['/transakcje']);
            break;
            case 'option4' :
              this.przychodyClicked = false;
              this.wydatkiClicked = false;
              this.transakcjeClicked = false;
              this.oplatyClicked = true;
              this.kontoClicked = false;
              this.mainpageClicked = false;
              this.router.navigate(['/oplaty']);
              break;
              case 'option5' :
                this.przychodyClicked = false;
                this.wydatkiClicked = false;
                this.transakcjeClicked = false;
                this.oplatyClicked = false;
                this.kontoClicked = true;
                this.mainpageClicked = false;
                this.router.navigate(['/konto']);
                break;
                case 'option6' :
                  this.przychodyClicked = false;
                  this.wydatkiClicked = false;
                  this.transakcjeClicked = false;
                  this.oplatyClicked = false;
                  this.kontoClicked = false;
                  this.mainpageClicked = true;
                  this.router.navigate(['/home']);

                  break;

    }
  }

  goToPrzychody() {
    this.router.navigate(['/crudtest']);
    console.log("aaaa");
    this.przychodyClicked = true;
        this.wydatkiClicked = false;
        this.transakcjeClicked = false;
        this.oplatyClicked = false;
        this.kontoClicked = false;
  }

}
