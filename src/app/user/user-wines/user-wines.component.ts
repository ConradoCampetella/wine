import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { WinesService } from '../../shared/wines.service';
import { Label } from '../../shared/label.model';
import { Wine } from '../../shared/wine.model';
import { ShoppingCart } from '../../shared/shoppingCart.model';

@Component({
  selector: 'app-user-wines',
  templateUrl: './user-wines.component.html',
  styleUrls: ['./user-wines.component.css']
})
export class UserWinesComponent implements OnInit {
  labels: Label[];
  winesAdd: Wine[] = [];
  scList: ShoppingCart[];
  p = 1;
  ipp = 2;
  butOne = true;
  butTwo = false;
  butThree = false;
  userProdFilterForm: FormGroup;
  filter = false;
  filterLabel = '';
  spinnerVisible = true;


  constructor(private wineService: WinesService) { }

  ngOnInit() {
    this.wineService.getAllLabels().subscribe((response: any[]) => {
      this.labels = response;
      this.spinnerVisible = false;
    });
    this.userProdFilterForm = new FormGroup({
      'userProd-Flabel': new FormControl(null, [Validators.required])
    });
    this.scList = this.wineService.getShoppingCart();
    for (const sc of this.scList) {
      this.winesAdd.push(sc.wine);
    }
  }

  changePages(page: number) {
    this.p = page;
    if (this.p === 1) {
      this.butOne = true;
      this.butTwo = false;
      this.butThree = false;
    } else if (this.p === 2) {
      this.butOne = false;
      this.butTwo = true;
      this.butThree = false;
    } else if (this.p === 3) {
      this.butOne = false;
      this.butTwo = false;
      this.butThree = true;
    }
  }

  onAdd(wine: Wine) {
    this.winesAdd.push(wine);
    this.wineService.addToShoppingCart(wine, 1);
  }

  onFilter() {
    this.ipp = 5;
    this.p = 1;
    this.filter = true;
    this.filterLabel = this.userProdFilterForm.get('userProd-Flabel').value;
  }
  onRemoveFilter() {
    this.ipp = 2;
    this.p = 1;
    this.filter = false;
    this.filterLabel = '';
  }
  classSuccess(wine) {
    if (this.winesAdd.find(wineAdd => wineAdd.wineId === wine.wineId)) {
      return 'success';
    } else {
      return null;
    }

  }
}
