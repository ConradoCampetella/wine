import { Component, OnInit } from '@angular/core';
import { Wine } from "app/shared/wine.model";
import { WinesService } from "app/shared/wines.service";

@Component({
  selector: 'app-homecontent',
  templateUrl: './homecontent.component.html',
  styleUrls: ['./homecontent.component.css']
})
export class HomecontentComponent implements OnInit {
  public wine: Wine[];
  constructor(private wineService: WinesService) { }

  ngOnInit() {
    
  }

}
