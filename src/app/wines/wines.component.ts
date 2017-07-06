import { Component, OnInit } from '@angular/core';
import {Wine} from '../shared/wine.model';
import {WinesService} from '../shared/wines.service';

@Component({
  selector: 'app-wines',
  templateUrl: './wines.component.html',
  styleUrls: ['./wines.component.css']
})
export class WinesComponent implements OnInit {
  public wine: Wine[];
  constructor(private wineService: WinesService) { 
  }

  ngOnInit() {
    this.wine = this.wineService.getAllWines();
  }

}
