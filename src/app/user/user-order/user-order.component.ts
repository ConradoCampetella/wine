import { Component, OnInit } from '@angular/core';

import { AuthService } from "app/shared/auth.service";
import { WinesService } from "app/shared/wines.service";
import { Order } from "app/shared/orders.model";

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  orders: Order[];
  username: string;

  constructor(private auths: AuthService, private wineService: WinesService) { }

  ngOnInit() {
    this.username = this.auths.getUserName();
    console.log(this.username);
    this.wineService.obtainOrders(this.username)
      .subscribe(
      (response: any[]) => { this.orders = response; console.log(this.orders); },
      (error: any) => { console.log(error); }
      );
  }

}
