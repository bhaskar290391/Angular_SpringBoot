import { Component, OnInit } from '@angular/core';
import {SalesPerson} from "./sales-person"

@Component({
  selector: 'app-sales-project-list',
  templateUrl: './sales-project-list.component.html',
  styleUrls: ['./sales-project-list.component.css']
})
export class SalesProjectListComponent implements OnInit {

  salesList:SalesPerson[]=[
    new SalesPerson("bhaskar","Mudaliyar","bhaskar@test.com",5000),
    new SalesPerson("kanishk","Mudaliyar","kanishk@test.com",2000),
    new SalesPerson("soni","Mudaliyar","soni@test.com",4000),
    new SalesPerson("babu","Mudaliyar","babu@test.com",6000)
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
