import { Component } from '@angular/core';
import { CrudTestService } from '../shared/crud-test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(public service: CrudTestService, private router: Router){}

  name: string = '';
  password: string = '';

  register() {
    console.log('Name:', this.name);
    console.log('Password:', this.password);
    this.service.postUser(this.name, this.password).subscribe({
       next: res=>{console.log(res);},
       error: err=>{console.log(err);}
     })
     this.navigateToLogin();
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
