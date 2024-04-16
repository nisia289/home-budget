import { Component } from '@angular/core';
import { CrudTestService } from '../shared/crud-test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(public service: CrudTestService, private router: Router) { }

  name: string = '';
  password: string = '';

  register() {

    let message = '';
    if (this.name.trim() === '') {
      message += 'Podaj usera';
    }
    if (this.password.trim() === '') {
      if (message.length > 0) {
        message += ' i hasło';
      } else {
        message = 'Podaj hasło';
      }
    }

    if (message.length > 0) {
      alert(message + '.');
      return;
    }

    console.log('Name:', this.name);
    console.log('Password:', this.password);
    this.service.postUser(this.name, this.password).subscribe({
      next: res => {
        console.log(res);
        if (res) {
          alert("Rejestracja zakończona pomyślnie"); 
          this.navigateToLogin(); 
        } else {
          alert("Rejestracja nieudana" ); 
        }
      },
      error: err => {
        alert("Wystąpił błąd podczas rejestracji: " + err.message); 
        console.log(err);
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
