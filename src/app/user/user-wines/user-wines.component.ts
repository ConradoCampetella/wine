import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

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
  butOne = true;
  butTwo = false;
  butThree = false;
  constructor(private wineService: WinesService) { }

  ngOnInit() {
    this.wineService.getAllLabels().subscribe((response: any[]) => {
      this.labels = response;
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

  onAdd(index:number){
    
  }
}
