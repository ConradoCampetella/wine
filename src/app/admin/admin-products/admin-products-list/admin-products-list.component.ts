import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Wine } from '../../../shared/wine.model';
import { WinesService } from '../../../shared/wines.service';
import { Label } from '../../../shared/label.model';

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
  min: number;
  max: number;
  filter: string;


  constructor(private wineService: WinesService) { }

  ngOnInit() {
    this.spinnerVisible = true;
    this.wineService.getAllLabels().subscribe(
      (res) => {
        this.spinnerVisible = false;
        this.labels = res;
      },
      (err) => {
        this.spinnerVisible = false;
        console.log(err);
      });
    this.pListFilterForm = new FormGroup({
      'pListFilterLabel': new FormControl('NoFilter'),
      'pListFilterMinP': new FormControl(0),
      'pListFilterMaxP': new FormControl(1000)
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
      });
  }

  showWine(price:number){
    if(price >= this.min && price <= this.max){
      return true;
    } else {
      return false;
    }
  }


}
