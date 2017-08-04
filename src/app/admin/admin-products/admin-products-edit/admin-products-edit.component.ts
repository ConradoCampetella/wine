import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { WinesService } from '../../../shared/wines.service';
import { Wine } from '../../../shared/wine.model';
import { Label } from '../../..//shared/label.model';

@Component({
  selector: 'app-admin-products-edit',
  templateUrl: './admin-products-edit.component.html',
  styleUrls: ['./admin-products-edit.component.css']
})
export class AdminProductsEditComponent implements OnInit {
  spinnerVisible = false;
  postError = false;
  wine: Wine;
  label: Label;
  labels: Label[];
  editProductForm: FormGroup;

  constructor(private route: ActivatedRoute, private winesService: WinesService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const wId = params['wineId'];
      this.labels = this.winesService.label;
      this.winesService.label.forEach(lb => {
        lb.wines.forEach(wn => {
          if (wn.wineId === wId) {
            this.wine = wn;
            this.label = lb;
          }
        });
      });
      this.editProductForm = new FormGroup({
        'editProductLabel': new FormControl(this.label.name, Validators.required),
        'editProductId': new FormControl(this.wine.wineId, [Validators.required, this.wineIdValidator.bind(this)]),
        'editProductName': new FormControl(this.wine.name, Validators.required),
        'editProductVariety': new FormControl(this.wine.variety, Validators.required),
        'editProductImg': new FormControl(this.wine.img, Validators.required),
        'editProductPrice': new FormControl(this.wine.price, Validators.required),
        'editProductDescription': new FormControl(this.wine.description, Validators.required)
      });


    });
  }

  wineIdValidator(control: FormControl): { [s: string]: boolean } {
    let index = -1;
    if (control.dirty) {
      this.labels.forEach(lb => {
        const i = lb.wines.findIndex(wn => wn.wineId === control.value);
        if (i !== -1) {
          index = i;
        }
      });
      if (index === -1 || control.value === this.wine.wineId) {
        return null;
      } else {
        return { 'wineIdExists': true }
      }
    } else {
      return null;
    }
  }

  onSubmit() {
    this.spinnerVisible = true;
    this.postError = false;
    const labelName = this.editProductForm.get('editProductLabel').value;
    const ilabel = this.labels.findIndex(lb => lb.name === labelName);
    const iwine = this.labels[ilabel].wines.findIndex(wn => wn.wineId === this.wine.wineId);
    const id = this.editProductForm.get('editProductId').value;
    const name = this.editProductForm.get('editProductName').value;
    const variety = this.editProductForm.get('editProductVariety').value;
    const img = this.editProductForm.get('editProductImg').value;
    const price = this.editProductForm.get('editProductPrice').value;
    const description = this.editProductForm.get('editProductDescription').value;
    const wineMod = new Wine(id, name, variety, img, description, price, this.wine.stock);
    this.winesService.modifyWine(wineMod, ilabel, iwine).subscribe(
      (res) => {
        this.winesService.getAllLabels().subscribe(
          (res) => {
            this.labels = res;
            this.wine = this.labels[ilabel].wines[iwine];
            this.spinnerVisible = false;
          },
          (err) => {
            this.spinnerVisible = false;
            this.postError = true;
          });

      },
      (err) => {
        console.log(err);
        this.spinnerVisible = false;
        this.postError = true;
      });
  }

}
