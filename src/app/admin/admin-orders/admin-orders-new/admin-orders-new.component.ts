import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { WinesService } from '../../../shared/wines.service';
import { AuthService } from '../../../shared/auth.service';
import { Wine } from '../../../shared/wine.model';
import { Label } from '../../../shared/label.model';
import { Order } from '../../../shared/orders.model';
import { ShoppingCart } from '../../../shared/shoppingCart.model';
import { WinesList } from '../../..//shared/winesList.model';

@Component({
  selector: 'app-admin-orders-new',
  templateUrl: './admin-orders-new.component.html',
  styleUrls: ['./admin-orders-new.component.css']
})
export class AdminOrdersNewComponent implements OnInit {
  wines: Wine[];
  winesAdd: Wine[] = [];
  wineList: WinesList[] = [];
  labels: Label[];
  scList: ShoppingCart[];
  spinnerVisible = true;
  newOrderFilterForm: FormGroup;
  min = 0;
  max = 1000;
  filter = 'NoFilter';
  winesPages: number[];
  numberOfWines: number;
  winesForPage = 9;
  page = 1;
  littleSpinner = false;
  orderError = false;
  total = 0;
  edit = false;

  constructor(private wineService: WinesService, private auths: AuthService, private router: Router) { }

  ngOnInit() {
    this.spinnerVisible = true;
    this.wineService.getAllLabels().subscribe(
      (res) => {
        this.spinnerVisible = false;
        this.labels = res;
        // fill wines list array
        this.labels.forEach(lb => {
          lb.wines.forEach(wn => {
            const wl = new WinesList(lb.name, wn.wineId, wn.name, wn.variety, wn.img, wn.description, wn.price, wn.cost, wn.stock);
            this.wineList.push(wl);
          });
        });
        this.numberOfPages();
      },
      (err) => {
        this.spinnerVisible = false;
        console.log(err);
      });
    // form init
    this.newOrderFilterForm = new FormGroup({
      'newOrderFilterForm-label': new FormControl(this.filter),
      'newOrderFilterForm-min': new FormControl(this.min),
      'newOrderFilterForm-max': new FormControl(this.max),
      'newOrderFilterForm-wpp': new FormControl(this.winesForPage),
      'newOrderFilterForm-order': new FormControl('Label')
    });
    this.filter = this.newOrderFilterForm.get('newOrderFilterForm-label').value;
    this.min = this.newOrderFilterForm.get('newOrderFilterForm-min').value;
    this.max = this.newOrderFilterForm.get('newOrderFilterForm-max').value;
    // subscribe to form changes
    this.newOrderFilterForm.valueChanges.subscribe(
      (status) => {
        if (this.newOrderFilterForm.get('newOrderFilterForm-min').value >= this.newOrderFilterForm.get('newOrderFilterForm-max').value) {
          this.newOrderFilterForm.get('newOrderFilterForm-max').setValue(this.newOrderFilterForm.get('newOrderFilterForm-min').value + 1);
        } else if (0 > this.newOrderFilterForm.get('newOrderFilterForm-max').value) {
          this.newOrderFilterForm.get('newOrderFilterForm-max').setValue(this.newOrderFilterForm.get('newOrderFilterForm-min').value + 1);
        } else if (0 > this.newOrderFilterForm.get('newOrderFilterForm-min').value) {
          this.newOrderFilterForm.get('newOrderFilterForm-min').setValue(0);
        } else if (10000 <= this.newOrderFilterForm.get('newOrderFilterForm-max').value) {
          this.newOrderFilterForm.get('newOrderFilterForm-max').setValue(9999);
        } else if (9999 <= this.newOrderFilterForm.get('newOrderFilterForm-min').value) {
          this.newOrderFilterForm.get('newOrderFilterForm-min').setValue(0);
        }
        this.filter = this.newOrderFilterForm.get('newOrderFilterForm-label').value;
        this.min = this.newOrderFilterForm.get('newOrderFilterForm-min').value;
        this.max = this.newOrderFilterForm.get('newOrderFilterForm-max').value;
        this.winesForPage = this.newOrderFilterForm.get('newOrderFilterForm-wpp').value;
        this.numberOfPages();
        this.sortWineList(this.newOrderFilterForm.get('newOrderFilterForm-order').value);
      });
    // init Shopping Cart
    this.scList = this.wineService.getShoppingCart();
    // calculate total if there are wines selected
    if (this.scList.length > 0) {
      this.calculateTotal();
    }

  }

  // Filter
  showWine(price: number) {
    if (price >= this.min && price <= this.max) {
      return true;
    } else {
      return false;
    }
  }
  // Pagination
  numberOfPages() {
    this.winesPages = null;
    this.winesPages = [];
    this.numberOfWines = 0;
    let nOfPages = 0;
    this.labels.forEach(lb => {
      if (lb.name === this.filter || this.filter === 'NoFilter') {
        lb.wines.forEach(wn => {
          if (this.showWine(wn.price)) {
            this.numberOfWines++;
          }
        });
      }
    });
    if (this.numberOfWines % this.winesForPage === 0) {
      nOfPages = Math.trunc(this.numberOfWines / this.winesForPage);
    } else {
      nOfPages = Math.trunc(this.numberOfWines / this.winesForPage) + 1;
    }
    for (let i = 0; i < nOfPages; i++) {
      this.winesPages.push(i + 1);
    }
  }

  pageActive(p: number) {
    if (this.winesPages.length === 1) {
      return 'active';
    } else if (p === this.page) {
      return 'active';
    }
  }

  onPage(p: number) {
    this.page = p;
  }
  // filter wines in table
  filterByPage(index: number) {
    const max = this.page * this.winesForPage;
    const min = (this.page - 1) * this.winesForPage;
    let show = false;
    if (this.numberOfWines <= this.winesForPage) {
      show = true;
    } else if (min <= index && index < max) {
      show = true;
    } else {
      show = false;
    }
    return show;
  }
  // Sort the wines
  sortWineList(criterion: string) {
    switch (criterion) {
      case 'Label':
        this.wineList.sort((a, b) => a.label.localeCompare(b.label));
        break;
      case 'Variety':
        this.wineList.sort((a, b) => a.variety.localeCompare(b.variety));
        break;
      case 'Price':
        this.wineList.sort((a, b) => b.price - a.price);
        break;
    }

  }
  // Add wines to cart
  onAdd(wine: Wine) {
    this.wineService.addToShoppingCart(wine, 1);
    this.scList = this.wineService.getShoppingCart();
    this.calculateTotal();
  }
  // Class for row in table of content if wine is added
  classSuccess(wine) {
    if (this.scList.find(wineAdd => wineAdd.wine.wineId === wine.wineId)) {
      return 'success';
    } else {
      return null;
    }
  }
  // Shopping list functions

  onDelete(sc) {
    if (confirm('Are you sure you want to remove the product from the cart?')) {
      this.wineService.removeFromShoppingCart(sc);
      this.scList = this.wineService.getShoppingCart();
      this.calculateTotal();
    }
  }

  plusValue(wine) {
    this.wineService.addToShoppingCart(wine, 1);
    this.scList = this.wineService.getShoppingCart();
    this.calculateTotal();
  }
  reduceValue(wine) {
    this.wineService.reduceQuantityShoppingCart(wine, 1);
    this.scList = this.wineService.getShoppingCart();
    this.calculateTotal();

  }
  calculateTotal() {
    this.total = 0;
    for (const sc of this.scList) {
      this.total += sc.wine.price * sc.quantity;
    }
  }
  onClearCart() {
    if (this.edit) {
      if (confirm('Are you sure you want to clear the Cart and Cancel the order Changes')) {
        this.wineService.clearShoppingList();
        this.wineService.clearEditOrder();
      }
    } else {
      if (confirm('Are you sure you want to clear the Cart')) {
        this.wineService.clearShoppingList();
      }
    }
    this.scList = this.wineService.getShoppingCart();
  }
  onConfirmOrder() {
    this.orderError = false;
    this.littleSpinner = true;
    this.wineService.generateOrder().subscribe(
      (res) => {
        this.littleSpinner = false;
      },
      (err) => {
        this.littleSpinner = false;
        this.orderError = true;
      });
  }
  onModifyOrder() {
    this.wineService.modifyOrderConfirm(this.edit).subscribe(
      (res) => {
        this.littleSpinner = false;
      },
      (err) => {
        this.littleSpinner = false;
        this.orderError = true;
      });
  }


}
