import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-admin-products-new',
  templateUrl: './admin-products-new.component.html',
  styleUrls: ['./admin-products-new.component.css']
})
export class AdminProductsNewComponent implements OnInit {
  newProductForm: FormGroup;
  productImg: File;
  productImgName = '';
  productImgType = '';
  productImgSize = -1;
  extError = true;
  sizeError = true;



  constructor() { }

  ngOnInit() {
    this.newProductForm = new FormGroup({
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
    console.log(this.productImgName);
    console.log(this.productImgType);
    console.log(this.productImgSize);

    if (this.fileExtValidator()) {
      this.newProductForm.get('newProductImg').setErrors({ extension: true });
    } else if (this.fileSizeValidator()) {
      this.newProductForm.get('newProductImg').setErrors({ size: true });
    } else {
      this.newProductForm.get('newProductImg').setErrors(null);
    }
    console.log(this.newProductForm.get('newProductImg').errors);
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

  }
}
