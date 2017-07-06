import { Component, OnInit } from '@angular/core';
import { Wine } from "app/shared/wine.model";
import { WinesService } from "app/shared/wines.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public wine: Wine[];
  constructor(private wineService: WinesService) { 
  }

  ngOnInit() {
    this.wine = this.wineService.getAllWines();
  }
}
