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

  constructor(public service: CrudTestService, private router: Router){}

  onLogin() {
    this.service.checkUser(this.username, this.password).subscribe({
      next: res=>{
        if (res.success) {
          alert("Logowanie powiodło się!");
          console.log("SUKCES!!!");
          this.isLoggedIn = true;
          this.router.navigate(['/home']);
        }
        else {
          alert("Logowanie nieudane: " + res.message);
          console.log(res.message);
        }
      },
      error: err => {
        alert("Wystąpił błąd podczas logowania.");
        console.log(err);
      }
    })
    this.service.setLoggedInUsername(this.username);
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
    this.loginHide = true;
    console.log(this.loginHide);
  }

}