import { Component, OnInit } from '@angular/core';
import { CrudTestService } from '../shared/crud-test.service';

@Component({
  selector: 'app-crud-test',
  templateUrl: './crud-test.component.html',
  styleUrls: ['./crud-test.component.css']
})
export class CrudTestComponent implements OnInit {

  constructor(public service: CrudTestService){}
  ngOnInit(): void {
    this.service.refreshList();
  }

}
