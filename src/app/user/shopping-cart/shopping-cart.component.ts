import { Component, OnInit } from '@angular/core';

import { WinesService } from "app/shared/wines.service";
import { ShoppingCart } from "app/shared/shoppingCart.model";


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  scList: ShoppingCart[];
  isEmpty: boolean = false;
  total = 0;
  value = 0;


  constructor(private wineService: WinesService) { }

  ngOnInit() {
    this.scList = this.wineService.getShoppingCart();
    if (this.scList.length > 0) {
      this.isEmpty = false;
      this.calculateTotal();
    }
    else {
      this.isEmpty = true;
    }
  }


  onDelete(sc) {
    this.wineService.removeFromShoppingCart(sc);
    this.scList = this.wineService.getShoppingCart();
    this.calculateTotal();
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
    for (let sc of this.scList) {
      this.total += sc.wine.price * sc.quantity;
    }

  }

}
