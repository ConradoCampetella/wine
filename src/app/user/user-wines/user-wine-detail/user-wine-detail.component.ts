import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LocationStrategy } from '@angular/common';

import { WinesService } from '../../../shared/wines.service';
import { Wine } from '../../../shared/wine.model';
import { ShoppingCart } from '../../../shared/shoppingCart.model';

@Component({
  selector: 'app-user-wine-detail',
  templateUrl: './user-wine-detail.component.html',
  styleUrls: ['./user-wine-detail.component.css']
})
export class UserWineDetailComponent implements OnInit {
  idWine: string;
  wine: Wine;
  winesAdd: Wine[] = [];
  scList: ShoppingCart[];

  constructor(private wineService: WinesService, private route: ActivatedRoute, private platformStrategy: LocationStrategy) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idWine = params['id'];
      this.wine = this.wineService.getOneWineWithId(this.idWine);
      this.scList = this.wineService.getShoppingCart();
      for (const sc of this.scList) {
        this.winesAdd.push(sc.wine);
      }
    })
  }
  goBack() {
    this.platformStrategy.back();
  }

  classSuccess() {
    if (this.winesAdd.find(wineAdd => wineAdd.wineId === this.wine.wineId)) {
      return 'success';
    } else {
      return null;
    }
  }
  onAdd() {
    this.winesAdd.push(this.wine);
    this.wineService.addToShoppingCart(this.wine, 1);
  }
}
