import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WinesService } from "app/shared/wines.service";
import { Label } from "app/shared/label.model";
import { Wine } from "app/shared/wine.model";

@Component({
  selector: 'app-winelabels',
  templateUrl: './winelabels.component.html',
  styleUrls: ['./winelabels.component.css']
})
export class WinelabelsComponent implements OnInit {

  labels: Label[];
  wine: Wine[];


  constructor(private wineService: WinesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.wineService.getAllLabels().subscribe(
      (response: any[]) => { this.labels = response; },
      (error: Error) => { console.log(error); }
    );    
  }

}
