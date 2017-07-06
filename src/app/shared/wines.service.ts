import { Injectable } from '@angular/core';
import {Wine} from './wine.model';


@Injectable()
export class WinesService {
  wine: Wine[]=[
    new Wine('Animal','Organic','../../assets/img/vino-animal.jpg','Smells and tastes in their natural state.',99), 
    new Wine('Animal','Organic','../../assets/img/vino-animal.jpg','Smells and tastes in their natural state.',99), 
    new Wine('Animal','Organic','../../assets/img/vino-animal.jpg','Smells and tastes in their natural state.',99), 
    new Wine('Animal','Organic','../../assets/img/vino-animal.jpg','Smells and tastes in their natural state.',99), 
    new Wine('Animal','Organic','../../assets/img/vino-animal.jpg','Smells and tastes in their natural state.',99), 
    new Wine('Animal','Organic','../../assets/img/vino-animal.jpg','Smells and tastes in their natural state.',99)
  ];

  constructor() {
  }

  getAllWines(){
    return this.wine.slice();
  }

}
