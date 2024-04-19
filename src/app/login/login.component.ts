import { Component } from '@angular/core';
import { CrudTestService } from '../shared/crud-test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoggedIn: boolean = false;
  username: string = '';
  password: string = '';
  loginHide: boolean = false;
  userId: number = 0;

  constructor(public service: CrudTestService, private router: Router){}

  onLogin() {
    this.service.checkUser(this.username, this.password).subscribe({
      next: res => {
        if (res.success) {
          alert("Logowanie powiodło się!");
          this.isLoggedIn = true;
          this.service.setLoggedInUsername(this.username); // Przenieść tutaj, aby zapewnić synchronizację
          this.fetchUserId(this.username);
          this.router.navigate(['/home']);
        } else {
          alert("Logowanie nieudane: " + res.message);
          console.log(res.message);
        }
      },
      error: err => {
        alert("Wystąpił błąd podczas logowania.");
        console.log(err);
      }
    });
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
    this.loginHide = true;
    console.log(this.loginHide);
  }

  fetchUserId(username: string): void {
    this.service.getUserIdByUsername(username).subscribe({
      next: (id) => {
        this.userId = id;
        console.log('User ID:', this.userId);
        this.service.setUserID(this.userId); // Przenieść tutaj, aby zapewnić synchronizację
      },
      error: (error) => {
        console.error('Error fetching user ID:', error);
      }
    });
  }

}
