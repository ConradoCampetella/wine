import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  isIn = false;
  constructor() { }

  ngOnInit() {
  }

  changeInClass(){
    this.isIn = !this.isIn;
  }

}
