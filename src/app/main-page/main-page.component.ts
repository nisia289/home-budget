import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],

})
export class MainPageComponent {

  przychodyClicked = false;
  wydatkiClicked = false;
  transakcjeClicked = false;
  oplatyClicked = false;
  kontoClicked = false;

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

}
