import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudTest } from './crud-test.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrudTestService {

  url: string = 'https://localhost:7216/api/Users';
  urlLogin: string = 'https://localhost:7216/api/Users/checkUser';
  urlToGetIdByUsername: string = 'https://localhost:7216/api/Users/username';
  list: CrudTest[] = [];
  loggedInUsername: string = '';
  userID: number = 0;
  formData : CrudTest = new CrudTest();
  constructor(private http: HttpClient) { }


  refreshList() {
    this.http.get(this.url)
    .subscribe({
      next: res=>{console.log(res);
      this.list = res as CrudTest[]},
      error: err=>{console.log(err)}
    })
  }

  postUser(Username: string, Password: string) {
    const userData = {
      userId: 0,
      username: Username,
      password: Password,
      userBudgets: []
    };
    return this.http.post(this.url, userData);
  }

  deleteUser(userId: number) {
    console.log(`${this.url}/${userId}`);
    return this.http.delete(`${this.url}/${userId}`);
  }

  updateUser(userId: number,) {
    const { username, password } = this.formData;
    const userData = {
      username: username,
      password: password,
      userBudgets: []
    };
  }

  checkUser(username: string, password: string): Observable<any> {
    return this.http.post(this.urlLogin, { username, password });
  }

  setLoggedInUsername(username: string) {
    this.loggedInUsername = username;
  }

  setUserID(userID: number) {
    this.userID = userID;
  }

  getUserIdByUsername(username: string): Observable<number> {
    return this.http.get<number>(`${this.urlToGetIdByUsername}/${username}`);
  }

}
