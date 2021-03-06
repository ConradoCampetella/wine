import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth.service';
import { WinesService } from '../../shared/wines.service';
import { Order } from '../../shared/orders.model';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  orders: Order[];
  username: string;
  details = false;
  clickedBtn: string;
  orderDetail: Order;
  detailTotal: number;
  detailProgress = 0;
  spinnerVisible = true;

  constructor(private auths: AuthService, private wineService: WinesService, private router: Router) { }

  ngOnInit() {
    this.username = this.auths.getUserName();
    this.wineService.obtainOrders(this.username)
      .subscribe(
      (response: any[]) => { this.orders = response; this.spinnerVisible = false; },
      (error: any) => { console.log(error); }
      );
  }

  onDetails(orderClicked: string) {
    this.orderDetail = this.orders.find(order => order.orderId === orderClicked);
    this.calculateDetailTotal();
    this.calculateDetailProgress()
    if (this.clickedBtn === orderClicked) {
      this.clickedBtn = '';
      this.details = false;
    } else {
      this.clickedBtn = orderClicked;
      this.details = true;
    }
  }

  onClickedButton(orderId) {
    if (this.clickedBtn === orderId) {
      return 'glyphicon glyphicon-arrow-up';
    } else {
      return 'glyphicon glyphicon-arrow-down';
    }
  }
  onClassActive(orderId) {
    if (this.clickedBtn === orderId) {
      return 'active';
    } else {
      return null;
    }
  }

  calculateDetailTotal() {
    if (this.orderDetail) {
      this.detailTotal = 0;
      for (const sc of this.orderDetail.sclOrder) {
        this.detailTotal += sc.quantity * sc.wine.price;
      }
    }
  }

  calculateDetailProgress() {
    switch (this.orderDetail.status) {
      case 'waiting for approve': {
        this.detailProgress = 100 / 6;
        break;
      }
      case 'Approved': {
        this.detailProgress = 2 * 100 / 6;
        break;
      }
      case 'Paid': {
        this.detailProgress = 3 * 100 / 6;
        break;
      }
      case 'Shipped': {
        this.detailProgress = 4 * 100 / 6;
        break;
      }
      case 'On its way': {
        this.detailProgress = 5 * 100 / 6;
        break;
      }
      case 'Arrive - Complete': {
        this.detailProgress = 100;
        break;
      }
      default: {
        this.detailProgress = 10;
      }
    }
  }
  buttonDisabled(status) {
    if (status === 'waiting for approve') {
      return false;
    } else {
      return true;
    }
  }

  onModify(orderId) {
    const orderM = this.orders.find(order => order.orderId === orderId);
    this.wineService.modifyOrder(orderM);
  }
  onDestroy(orderId) {
    if (confirm('ARE YOU SURE THAT YOU WANT TO DELETE THE ORDER?')) {
      this.wineService.destroyOrder(orderId);
      const index = this.orders.findIndex(order => order.orderId === orderId);
      this.orders.splice(index);
    }

  }
  onOrderToCart() {
    for (const mySL of this.orderDetail.sclOrder) {
      this.wineService.addToShoppingCart(mySL.wine, mySL.quantity);
      this.router.navigate(['/user/shoppingcart']);
    }
  }
}
