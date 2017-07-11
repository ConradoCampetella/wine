import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as firebase from 'firebase';
import 'rxjs/Rx';
import { Router } from '@angular/router';

import { Wine } from './wine.model';
import { Label } from "app/shared/label.model";
import { AuthService } from "app/shared/auth.service";
import { Observer } from "rxjs/Observer";
import { Observable } from "rxjs/Observable";


@Injectable()
export class WinesService {

  /* --- labels and wines to send to the database
    label: Label[] = [
      new Label('Animal', 'Wine made from Organic Vineyards, Smells and tastes their natural state.', '../../assets/img/label-animal.jpg', [
        new Wine('Extra Brut', 'Method of processing Charmat', '../../assets/img/animal_extrabrut.png', 'Elegant & memoralble', 99),
        new Wine('L`Orange ', 'Semillón - Chardonay', '../../assets/img/animal_lorange.png', 'Intense, clean and bright', 99),
        new Wine('Chardonay', '100% Chardonay', '../../assets/img/animal_chardonnay.jpg', 'Ideal for a sunny afternoon with friends', 99),
        new Wine('Malbec', '100% Malbec', '../../assets/img/animal_malbec.jpg', 'Magnificent speciment', 99),
        new Wine('Cabernet Saivignon', '100% Cabernet Saivignon', '../../assets/img/animal_cabernetSavignon.jpg', 'Young and Intense', 99)
      ]),
      new Label('Siesta', 'A Dreamer`s Wine', '../../assets/img/label-siesta.jpg', [
        new Wine('Cabernet Franc - Bio', '100% Cabernet Franc', '../../assets/img/siesta_cabernetFranc.jpg', 'Spicey and unique', 99),
        new Wine('Cabernet Sauvignon - Bio', 'Single Vineyards. Vista Flores Vineyards', '../../assets/img/siesta_cabernetSauvignon.jpg', 'Intense, clean and bright', 99),
        new Wine('Malbec - Bio', 'Single Vineyards. Vista Flores Vineyards', '../../assets/img/siesta_malbec.jpg', 'Deep and perfectly balanced', 99),
        new Wine('Mara - Pinot Noir', '100% Pinot Noir - Río Negro, Patagonia', '../../assets/img/siesta_maraPinotNoir.jpg', 'Fresh and perfectly harmonized', 99),
        new Wine('Cabernet Franc', 'Vista Flores Vineyards', '../../assets/img/siesta_cabernetFranc.jpg', 'Lively, interesting and distintive', 99),
        new Wine('Cabernet Sauvignon', 'Vista Flores Vineyards', '../../assets/img/siesta_cabernetSauvignon.jpg', 'Lively, interesting and distintive', 99),
        new Wine('Malbec', 'Vista Flores Vineyards', '../../assets/img/siesta_malbec.jpg', 'Lively, interesting and distintive', 99)
      ]),
      new Label('Alma Negra', 'A secret unveiled through the senses. Dark pleassures. Alchemy. What is eccentric, elegant, aristocratic', '../../assets/img/label-almanegra.jpg', [
        new Wine('Rose', 'Method process: Champenoise', '../../assets/img/almanegra_rose.jpg', 'Efervescense of delicate bubles', 99),
        new Wine('Blanc De Blancs', 'Method process: Champenoise', '../../assets/img/almanegra_blancoDeblanco.jpeg', 'Delicate nuts mousse', 99),
        new Wine('Magnum Blanc de Blancs', 'Method process: Champenoise', '../../assets/img/almanegra_magnumBlanco.jpeg', 'Efervescense of delicate bubles', 99),
        new Wine('Blanc', 'Secret Blend', '../../assets/img/almanegra_blanco.jpeg', 'Lively, interesting and distinctive', 99),
        new Wine('Tinto', 'Secret Blend', '../../assets/img/almanegra_tinto.jpg', 'Unveil the hidden notes in between the lines', 99),
        new Wine('Gran Alma Negra', 'secret Blend', '../../assets/img/almanegra_granAN.jpeg', 'Enjoy the state of secrecy', 99)
      ]),
      new Label('Tikal', 'The Art of blending malbec. Inspired Wines. Complex Flavours', '../../assets/img/label-tikal.jpg', [
        new Wine('Natural', 'Malbec 60% - Syrah 40%', '../../assets/img/tikal_natural.jpg', 'Natural expresion of the virgin grape', 99),
        new Wine('Patriota', 'Malbec 60% - Bonarda 40%', '../../assets/img/tikal_patriota.jpg', 'Incredibly fun to drink!', 99),
        new Wine('Jubilo', 'Malbec 60% - Cabernet Sauvignon 40%', '../../assets/img/tikal_jubilo.png', 'The wine you were looking for the asado', 99),
        new Wine('Amorio', 'Malbec 60% - Cabernet Franc 40%', '../../assets/img/tikal_amorio.jpg', 'Aromas for smoaky oak and cherry', 99),
        new Wine('Locura', 'Malbec 60% - Cabernet Franc 30% - Torrentes 7% - Criolla 3%', '../../assets/img/tikal_locura.jpg', 'Singular and definetly crazy', 99)
      ]),
      new Label('Padrillos', 'Wine with balls, traditional style - classic. Table wine. Criollo - Gauchesco', '../../assets/img/label-padrillos.jpg', [
        new Wine('Suavignon Blanc', '100% Sauvignon Blanc - Uco Valley, Mendoza', '../../assets/img/padrillos_sauvignonBlanc.jpeg', 'Splendid wild fruit and freshness', 99),
        new Wine('Trifecta', '40% Chenin, 40% Tocai, 20% Torrontes - Agrlo, Rivadavia, Cafayate', '../../assets/img/padrillos_trifecta.png', 'Wine of great personality', 99),
        new Wine('Pinot Noir', '100% Pinot Noir - Uco Valley, Mendoza', '../../assets/img/padrillos_pinotNoir.png', 'Fragrance like freshly cut grass', 99),
        new Wine('Malbec', '100% Malbec 60% - Uco Valley, Mendoza', '../../assets/img/padrillos_malbec.jpg', 'Lively and indomitable vitality', 99)
      ])
    ]*/

  constructor(private http: Http, private router: Router, private auths: AuthService) {
  }
  getAllLabels() {
    return this.http.get('https://ng-wine-app.firebaseio.com/labels.json')
      .map((response:Response)=>{
        const labels:Label[] = response.json();
        return labels;
      })
      .catch((error:Response)=>{
        return Observable.throw('No Labels were Found');
      });
  }
  getAllWines(index:number) {
    return this.http.get('https://ng-wine-app.firebaseio.com/labels/'+index+'/wines.json')
      .map((response:Response)=>{
        const wines:Wine[] = response.json();
        return wines;
      })
      .catch((error:Response)=>{
        return Observable.throw('No Wines were Found');
      });
  }
  getOneWine(ilabel:number, iwine:number){
    return this.http.get('https://ng-wine-app.firebaseio.com/labels/'+ilabel+'/wines/'+iwine+'.json')
      .map((response:Response)=>{
        const wine:Wine = response.json();
        return wine;
      })
      .catch((error:Response)=>{
        return Observable.throw('No Wines were Found');
      });
  }

}