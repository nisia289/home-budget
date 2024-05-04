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
  urlToUploadImage: string = 'https://localhost:7216/api/Users/upload-image';
  list: CrudTest[] = [];
  loggedInUsername: string = '';
  userID: number = 0;
  chosenBudgetID: number = 0;
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
    return this.http.get<number>(`${this.urlToGetIdByUsername}/${username}`)
  }

  uploadFile(file: File, id: number): void {
    const url = `${this.urlToUploadImage}/${id}`;
    const formData = new FormData();
    formData.append('image', file);
    console.log("TO JEST URL"+url);

    this.http.post(url, formData, { responseType: 'text' })
      .subscribe({
        next: (response) => console.log('Image uploaded successfully!' + url, response),
        error: (error) => console.error('Error uploading image', error)
      });
  }

  getUserPhoto(userId: number): Observable<Blob> {
    return this.http.get(`https://localhost:7216/api/Users/${userId}/photo`, { responseType: 'blob' });
  }

  setChosenBudgetID(id: number) {
    this.chosenBudgetID = id;
  }

}
