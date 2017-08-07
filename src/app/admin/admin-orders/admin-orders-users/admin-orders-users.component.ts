import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/auth.service';
import { WinesService } from '../../../shared/wines.service';
import { Order } from '../../../shared/orders.model';
import { ShoppingCart } from '../../../shared/shoppingCart.model';
import { OrdersList } from '../../../shared/ordersList.model';

@Component({
  selector: 'app-admin-orders-users',
  templateUrl: './admin-orders-users.component.html',
  styleUrls: ['./admin-orders-users.component.css']
})
export class AdminOrdersUsersComponent implements OnInit {

  orderList: OrdersList[];
  users: string[] = [];
  status: string[] = [];
  username: string;
  details = false;
  clickedBtn: string;
  orderDetail: OrdersList;
  detailTotal: number;
  detailProgress = 0;
  spinnerVisible = true;
  orderFilterForm: FormGroup;
  orderPages: number[];
  numberOfOrders = 0;
  ordersForPage = 9;
  page = 1
  userFilter: string;
  statusFilter: string;
  orderStatusForm: FormGroup;

  constructor(private auths: AuthService, private wineService: WinesService, private router: Router) { }

  ngOnInit() {
    this.wineService.getOrderList().subscribe(
      (response: OrdersList[]) => {
        this.orderList = response;
        this.spinnerVisible = false;
        this.orderList.forEach(ol => {
          let uflag = true;
          this.users.forEach(user => {
            if (ol.userId === user) {
              uflag = false;
            }
          });
          if (uflag) {
            this.users.push(ol.userId);
          }
        });
        this.numberOfPages();
      },
      (error) => {
        console.log(error);
        this.spinnerVisible = false;
      });
    this.orderFilterForm = new FormGroup({
      'orderFilter-user': new FormControl('NoFilter'),
      'orderFilter-status': new FormControl('NoFilter'),
      'orderFilter-order': new FormControl('User'),
      'orderFilter-opp': new FormControl(this.ordersForPage)
    });
    this.userFilter = this.orderFilterForm.get('orderFilter-user').value;
    this.statusFilter = this.orderFilterForm.get('orderFilter-status').value;
    this.orderFilterForm.valueChanges.subscribe((st) => {
      this.userFilter = this.orderFilterForm.get('orderFilter-user').value;
      this.statusFilter = this.orderFilterForm.get('orderFilter-status').value;
      if (this.orderFilterForm.get('orderFilter-opp').value < 1) {
        this.orderFilterForm.get('orderFilter-opp').setValue(1);
      }
      this.ordersForPage = this.orderFilterForm.get('orderFilter-opp').value;
      this.numberOfPages();
      this.sortOrderList(this.orderFilterForm.get('orderFilter-order').value);
    });

  }

  // Pagination  ----

  numberOfPages() {
    this.orderPages = null;
    this.orderPages = [];
    this.numberOfOrders = 0;
    let nOfPages = 0;
    this.orderList.forEach(ol => {
      if (ol.userId === this.userFilter || this.userFilter === 'NoFilter') {
        if (ol.status === this.statusFilter || this.statusFilter === 'NoFilter') {
          this.numberOfOrders++;
        }
      }
    });
    if (this.numberOfOrders % this.ordersForPage === 0) {
      nOfPages = Math.trunc(this.numberOfOrders / this.ordersForPage);
    } else {
      nOfPages = Math.trunc(this.numberOfOrders / this.ordersForPage) + 1;
    }
    for (let i = 0; i < nOfPages; i++) {
      this.orderPages.push(i + 1);
    }
  }

  pageActive(p: number) {
    if (this.orderPages.length === 1) {
      return 'active';
    } else if (p === this.page) {
      return 'active';
    }
  }

  onPage(p: number) {
    this.page = p;
  }

  filterByPage(index: number) {
    const max = this.page * this.ordersForPage;
    const min = (this.page - 1) * this.ordersForPage;
    let show = false;
    if (this.numberOfOrders <= this.ordersForPage) {
      show = true;
    } else if (min <= index && index < max) {
      show = true;
    } else {
      show = false;
    }
    return show;
  }
  // Order the table ----

  sortOrderList(criterion: string) {
    switch (criterion) {
      case 'User':
        this.orderList.sort((a, b) => a.userId.localeCompare(b.userId));
        break;
      case 'Date':
        this.orderList.sort((a, b) => b.date - a.date);
        break;
      case 'Status':
        this.orderList.sort((a, b) => a.status.localeCompare(b.status));
        break;
    }

  }

  // Handle details section -----
  onDetails(orderClicked: string) {
    this.orderDetail = this.orderList.find(order => order.orderId === orderClicked);
    this.calculateDetailTotal();
    this.calculateDetailProgress();
    this.updateStatusForm();
    if (this.clickedBtn === orderClicked) {
      this.clickedBtn = '';
      this.details = false;
    } else {
      this.clickedBtn = orderClicked;
      this.details = true;
    }
  }
  // Class of Detail button in table
  onClickedButton(orderId) {
    if (this.clickedBtn === orderId) {
      return 'glyphicon glyphicon-arrow-up';
    } else {
      return 'glyphicon glyphicon-arrow-down';
    }
  }
  // Class for the selected row in the table
  onClassActive(orderId) {
    if (this.clickedBtn === orderId) {
      return 'active';
    } else {
      return null;
    }
  }
  // Function to calculate the total of the order detail
  calculateDetailTotal() {
    if (this.orderDetail) {
      this.detailTotal = 0;
      for (const sc of this.orderDetail.sclOrder) {
        this.detailTotal += sc.quantity * sc.wine.price;
      }
    }
  }
  // Function to calculate the progress of the progress bar
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
  // Disabled the delete button if the order is paid--
  buttonDisabled(status) {
    if (status === 'waiting for approve') {
      return false;
    } else {
      return true;
    }
  }

  // Destroy the order and regain the list of orders
  onDestroy(orderId) {
    if (confirm('ARE YOU SURE THAT YOU WANT TO DELETE THE ORDER?')) {
      const orderDestroy = this.orderList.find(ol => ol.orderId === orderId);
      this.wineService.adminDestroyOrder(orderDestroy).subscribe(
        (res) => {
          this.orderList = res;
          this.numberOfPages();
          this.sortOrderList(this.orderFilterForm.get('orderFilter-order').value);
          this.details = false;
        },
        (err) => {
          console.log(err);
          alert('Something went wrong - could NOT delete order - Please try again later');
        });
    }

  }

  // Init the update Form
  updateStatusForm() {
    this.orderStatusForm = new FormGroup({
      'orderStatus-status': new FormControl(this.orderDetail.status)
    });
  }
  // Update the status of the order
  onUpdateOrderStatus(orderId) {
    const orderUpdate = this.orderList.find(ol => ol.orderId === orderId);
    orderUpdate.status = this.orderStatusForm.get('orderStatus-status').value;
    this.wineService.adminUpdateORder(orderUpdate).subscribe(
      (res) => {
        this.orderList = res;
        this.numberOfPages();
        this.sortOrderList(this.orderFilterForm.get('orderFilter-order').value);
        this.orderDetail = this.orderList.find(ol => ol.orderId === orderId);
        this.calculateDetailTotal();
        this.calculateDetailProgress();
      },
      (err) => {
        console.log(err);
        alert('Something went wrong - could NOT Update order - Please try again later');
      });
  }

  // Aprobe the order and update the wines stock
  onAprobeOrder(orderId) {
    const orderUpdate = this.orderList.find(ol => ol.orderId === orderId);
    orderUpdate.status = 'Approved';
    this.wineService.adminAprobeOrder(orderUpdate).subscribe(
      (res) => {
        this.orderList = res;
        this.numberOfPages();
        this.sortOrderList(this.orderFilterForm.get('orderFilter-order').value);
        this.orderDetail = this.orderList.find(ol => ol.orderId === orderId);
        this.calculateDetailTotal();
        this.calculateDetailProgress();
      },
      (err) => {
        console.log(err);
        alert('Something went wrong - could NOT Aprobe order - Please try again later');
      });
  }

}
