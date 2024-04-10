import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudTest } from './crud-test.model';

@Injectable({
  providedIn: 'root'
})
export class CrudTestService {

  url: string = 'https://localhost:7216/api/Users';
  list: CrudTest[] = [];
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

  postUser() {
    // Pobierz username i password z formData
    const { username, password } = this.formData;

    // Zdefiniuj resztę danych statycznie
    const userData = {
      userId: 0,
      username: username,
      password: password,
      userBudgets: []
    };
    return this.http.post(this.url, userData);
  }

  deleteUser(userId: number) {
    console.log(`${this.url}/${userId}`);
    return this.http.delete(`${this.url}/${userId}`);
  }

  updateUser(userId: number, userData: any) {
    const url = `${this.url}/${userId}`;
    return this.http.put(url, userData);
  }

}
