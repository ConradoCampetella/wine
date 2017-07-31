import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

import { WinesService } from '../../../shared/wines.service';
import { Label } from '../../../shared/label.model';
import { Wine } from '../../../shared/wine.model';

@Component({
  selector: 'app-admin-products-new',
  templateUrl: './admin-products-new.component.html',
  styleUrls: ['./admin-products-new.component.css']
})
export class AdminProductsNewComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url:'http://localhost:8080/upload'});

  labels: Label[];
  newProductForm: FormGroup;
  productImg: File;
  productImgName = '';
  productImgType = '';
  productImgSize = -1;
  extError = true;
  sizeError = true;



  constructor(private winesService: WinesService) { }

  ngOnInit() {
    this.winesService.getAllLabels().subscribe(
      res => {
        this.labels = res;
      },
      err => {
        console.log(err);
      });
    this.newProductForm = new FormGroup({
      'newProductLabel': new FormControl(null, Validators.required),
      'newProductId': new FormControl(null, Validators.required),
      'newProductName': new FormControl(null, Validators.required),
      'newProductVariety': new FormControl(null, Validators.required),
      'newProductImg': new FormControl(null, Validators.required),
      'newProductPrice': new FormControl(null, Validators.required),
      'newProductDescription': new FormControl(null, Validators.required)
    });

  }

  onFileChange($event) {
    this.productImg = $event.target.files[0];
    this.productImgName = this.productImg.name;
    this.productImgType = this.productImg.type;
    this.productImgSize = this.productImg.size;
    if (this.fileExtValidator()) {
      this.newProductForm.get('newProductImg').setErrors({ extension: true });
    } else if (this.fileSizeValidator()) {
      this.newProductForm.get('newProductImg').setErrors({ size: true });
    } else {
      this.newProductForm.get('newProductImg').setErrors(null);
    }
    console.log(this.newProductForm.get('newProductLabel').value);
  }

  fileExtValidator() {
    if (this.productImgType === 'image/jpg' || this.productImgType === 'image/png' || this.productImgType === 'image/jpeg') {
      return false;
    }
    else {
      return true;
    }
  }

  fileSizeValidator() {
    if (this.productImgSize <= 100000) {
      return false;
    }
    else {
      return true;
    }
  }

  onSubmit() {
    const labelName = this.newProductForm.get('newProductLabel').value;
    const ilabel = this.labels.findIndex(lb => lb.name === labelName);
    const iwine = this.labels[ilabel].wines.length;
    const id = this.newProductForm.get('newProductId').value;
    const name = this.newProductForm.get('newProductName').value;
    const variety = this.newProductForm.get('newProductVariety').value;
    const img = this.productImgName;
    const price = this.newProductForm.get('newProductPrice').value;
    const description = this.newProductForm.get('newProductDescription').value;
    const wine = new Wine(id, name, variety, img, description, price, 0);
    var imgFile = this.productImg;
    this.winesService.addNewWine(wine, ilabel, iwine, this.productImg).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      });
  }

}
