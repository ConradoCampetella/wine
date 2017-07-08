import { Component, OnInit, ViewChild } from '@angular/core';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = -40.7627274;
  lng: number = -71.6414559;
  zoom: 20;
 
 


  constructor() { }

  ngOnInit() {
  }

}
