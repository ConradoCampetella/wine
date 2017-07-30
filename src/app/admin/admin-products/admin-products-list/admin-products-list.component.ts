import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Wine } from '../../../shared/wine.model';
import { WinesService } from '../../../shared/wines.service';
import { Label } from '../../../shared/label.model';
import { Order } from "app/shared/orders.model";
import { AuthService } from "app/shared/auth.service";

@Component({
  selector: 'app-admin-products-list',
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.css']
})
export class AdminProductsListComponent implements OnInit {
  wines: Wine[];
  labels: Label[];
  spinnerVisible = true;
  pListFilterForm: FormGroup;
  min = 0;
  max = 1000;
  filter = 'NoFilter';
  winesPages: number[];
  numberOfWines: number;
  winesForPage = 9;
  page = 1;


  constructor(private wineService: WinesService, private auths: AuthService) { }

  ngOnInit() {
    this.spinnerVisible = true;
    this.wineService.getAllLabels().subscribe(
      (res) => {
        this.spinnerVisible = false;
        this.labels = res;
        this.numberOfPages();
      },
      (err) => {
        this.spinnerVisible = false;
        console.log(err);
      });
    this.pListFilterForm = new FormGroup({
      'pListFilterLabel': new FormControl(this.filter),
      'pListFilterMinP': new FormControl(this.min),
      'pListFilterMaxP': new FormControl(this.max),
      'pListFilterWpp': new FormControl(this.winesForPage)
    });
    this.filter = this.pListFilterForm.get('pListFilterLabel').value;
    this.min = this.pListFilterForm.get('pListFilterMinP').value;
    this.max = this.pListFilterForm.get('pListFilterMaxP').value;
    this.pListFilterForm.valueChanges.subscribe(
      (status) => {
        if (this.pListFilterForm.get('pListFilterMinP').value >= this.pListFilterForm.get('pListFilterMaxP').value) {
          this.pListFilterForm.get('pListFilterMaxP').setValue(this.pListFilterForm.get('pListFilterMinP').value + 1);
        } else if (0 > this.pListFilterForm.get('pListFilterMaxP').value) {
          this.pListFilterForm.get('pListFilterMaxP').setValue(this.pListFilterForm.get('pListFilterMinP').value + 1);
        } else if (0 > this.pListFilterForm.get('pListFilterMinP').value) {
          this.pListFilterForm.get('pListFilterMinP').setValue(0);
        } else if (10000 <= this.pListFilterForm.get('pListFilterMaxP').value) {
          this.pListFilterForm.get('pListFilterMaxP').setValue(9999);
        } else if (9999 <= this.pListFilterForm.get('pListFilterMinP').value) {
          this.pListFilterForm.get('pListFilterMinP').setValue(0);
        }
        this.filter = this.pListFilterForm.get('pListFilterLabel').value;
        this.min = this.pListFilterForm.get('pListFilterMinP').value;
        this.max = this.pListFilterForm.get('pListFilterMaxP').value;
        this.winesForPage = this.pListFilterForm.get('pListFilterWpp').value;
        this.numberOfPages();
      });
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
    if (p === this.page) {
      return 'active';
    }
  }

  onPage(p: number) {
    this.page = p;
  }

  filterByPage(il: number, iw: number) {
    const max = this.page * this.winesForPage;
    const min = (this.page - 1) * this.winesForPage;
    let cant = 0;
    for (let j = 0; j < il; j++) {
      cant += this.labels[j].wines.length;
    }
    cant += iw;
    let show = false;
    if (this.numberOfWines <= this.winesForPage) {
      show = true;
    } else if (min <= cant && cant < max) {
      show = true;
    } else {
      show = false;
    }
    return show;
  }
  // Delete Products
  onDeleteWine(wId) {
    const allOrders: Order[] = [];
    this.auths.getAllUsers().subscribe((users) => {
      this.wineService.getAllOrders().subscribe(
        (res) => {
          this.wineService.allOrders.forEach(order => {
            order.sclOrder.forEach(shc => {
              if (shc.wine.wineId === wId) {
                alert("NO SE PUEDE BORRAR, VINO EN PEDIDO!!!!!!!");
              }
            });
          });
        },
        (err) => {
          console.log(err);
          alert("NO SE PUEDE CONECTAR CON EL SERVIDOR, INTENTELO MAS TARDE");
        });
    });
  }

}
