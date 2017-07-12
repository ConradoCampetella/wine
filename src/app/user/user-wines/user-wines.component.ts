import { Component, OnInit } from '@angular/core';

import { WinesService } from "app/shared/wines.service";
import { Label } from "app/shared/label.model";

@Component({
  selector: 'app-user-wines',
  templateUrl: './user-wines.component.html',
  styleUrls: ['./user-wines.component.css']
})
export class UserWinesComponent implements OnInit {
  labels: Label[];
  constructor(private wineService: WinesService) { }

  ngOnInit() {
    this.wineService.getAllLabels().subscribe((response :any[])=>{
      this.labels = response;
    });
  }

}
