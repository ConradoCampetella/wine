import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { WinesService } from "app/shared/wines.service";
import { Label } from "app/shared/label.model";

@Component({
  selector: 'app-user-wines',
  templateUrl: './user-wines.component.html',
  styleUrls: ['./user-wines.component.css']
})
export class UserWinesComponent implements OnInit {
  labels: Label[];
  p: number = 1;
  ipp: number = 2;
  butOne = true;
  butTwo = false;
  butThree = false;
  userProdFilterForm: FormGroup;
  filter: boolean = false;
  filterLabel: string = "";


  constructor(private wineService: WinesService) { }

  ngOnInit() {
    this.wineService.getAllLabels().subscribe((response: any[]) => {
      this.labels = response;
    });
    this.userProdFilterForm = new FormGroup({
      'userProd-Flabel': new FormControl(null, [Validators.required])
    });
  }

  changePages(page: number) {
    this.p = page;
    if (this.p == 1) {
      this.butOne = true;
      this.butTwo = false;
      this.butThree = false;
    } else if (this.p == 2) {
      this.butOne = false;
      this.butTwo = true;
      this.butThree = false;
    } else if (this.p == 3) {
      this.butOne = false;
      this.butTwo = false;
      this.butThree = true;
    }
  }

  onAdd(index: number) {

  }

  onFilter() {
    this.ipp = 5;
    this.p = 1;
    this.filter = true;
    this.filterLabel = this.userProdFilterForm.get('userProd-Flabel').value;
    console.log(this.filter + "label: " + this.filterLabel);
  }
  onRemoveFilter() {
    this.ipp = 2;
    this.p = 1;
    this.filter = false;
    this.filterLabel = "";
  }
}
