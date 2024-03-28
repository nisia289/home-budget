import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudTest } from './crud-test.model';

@Injectable({
  providedIn: 'root'
})
export class CrudTestService {

  url: string = 'https://localhost:7216/api/Users';
  list: CrudTest[] = [];

  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get(this.url)
    .subscribe({
      next: res=>{console.log(res);
      this.list = res as CrudTest[]},
      error: err=>{console.log(err)}
    })
  }

}
