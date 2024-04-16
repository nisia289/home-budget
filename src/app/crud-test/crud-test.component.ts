import { Component, OnInit } from '@angular/core';
import { CrudTestService } from '../shared/crud-test.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-crud-test',
  templateUrl: './crud-test.component.html',
  styleUrls: ['./crud-test.component.css']
})
export class CrudTestComponent implements OnInit {

  idToDelete: number = 0;

  constructor(public service: CrudTestService){}
  ngOnInit(): void {
    this.service.refreshList();
  }
  //onSubmit() {
    //this.service.postUser().subscribe({
     // next: res=>{console.log(res);},
     // error: err=>{console.log(err);}
    //})
 // }

  deleteUser(idToDelete: number) {
    this.service.deleteUser(idToDelete).subscribe({
      next: res=>{console.log(res);},
      error: err=>{console.log(err);}
    })
  }


}
