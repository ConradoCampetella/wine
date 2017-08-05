import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as firebase from 'firebase';
import 'rxjs/Rx';
import { Router } from '@angular/router';

import { Wine } from './wine.model';
import { Label } from 'app/shared/label.model';
import { AuthService } from 'app/shared/auth.service';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from 'app/shared/shoppingCart.model';
import { Order } from 'app/shared/orders.model';
import { User } from 'app/shared/user.model';
import { OrdersList } from 'app/shared/ordersList.model';


@Injectable()
export class WinesService {
  shoppingCart: ShoppingCart[] = [];
  label: Label[] = [];
  edit: string;
  allOrders: Order[] = [];

  constructor(private http: Http, private router: Router, private auths: AuthService) { }

  getAllLabels() {
    return this.http.get('https://ng-wine-app.firebaseio.com/labels.json')
      .map((response: Response) => {
        const labels: Label[] = response.json();
        this.label = response.json();
        return labels;
      })
      .catch((error: Response) => {
        return Observable.throw('No Labels were Found');
      });
  }

  getOneLabel(index: number) {
    return this.http.get('https://ng-wine-app.firebaseio.com/labels/' + index + '.json')
      .map((response: Response) => {
        const label: Label[] = response.json();
        return label;
      })
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  getAllWines(index: number) {
    return this.http.get('https://ng-wine-app.firebaseio.com/labels/' + index + '/wines.json')
      .map((response: Response) => {
        const wines: Wine[] = response.json();
        return wines;
      })
      .catch((error: Response) => {
        return Observable.throw('No Wines were Found');
      });
  }
  getOneWine(ilabel: number, iwine: number) {
    return this.http.get('https://ng-wine-app.firebaseio.com/labels/' + ilabel + '/wines/' + iwine + '.json')
      .map((response: Response) => {
        const wine: Wine = response.json();
        return wine;
      })
      .catch((error: Response) => {
        return Observable.throw('No Wines were Found');
      });
  }

  getOneWineWithId(id: string) {
    if (this.label.length !== 0) {
      const ilabel = this.label.findIndex(label => label.wines.find(wine => wine.wineId === id) != null);
      return this.label[ilabel].wines.find(wine => wine.wineId === id);
    } else {
      this.router.navigate(['/user/wines']);
    }
  }

  addNewWine(wine: Wine, ilabel: number, iwine: number, imgFile: File) {
    const token = this.auths.getToken();
    const newWine = Observable.create((observer: Observer<string>) => {
      let fData = new FormData();
      fData.append('img', imgFile);
      this.http.post('http://localhost:8080/upload', fData)
        .subscribe(
        (res: Response) => {
          this.http.put('https://ng-wine-app.firebaseio.com/labels/' + ilabel + '/wines/' + iwine + '.json?auth=' + token, wine)
            .subscribe(
            resp => {
              const token = this.auths.getToken();
              observer.next('success');
            },
            err => {
              observer.error(err);
            });
        },
        (error) => {
          observer.error(error);
        });
    });
    return newWine;
  }

  deleteWine(ilabel: number, iwine: number) {
    const token = this.auths.getToken();
    let wines: Wine[] = [];
    const delWine = Observable.create((observer: Observer<string>) => {
      this.http.get('https://ng-wine-app.firebaseio.com/labels/' + ilabel + '/wines.json')
        .map((res: Response) => {
          const ws: Wine[] = res.json();
          return ws;
        })
        .subscribe(
        (resp) => {
          wines = resp;
          wines.splice(iwine, 1);
          firebase.database().ref('labels').child(ilabel.toString()).child('wines').set(wines)
            .then(
            (respo) => {
              observer.next('success');
            })
            .catch(
            (err) => {
              observer.error(err);
            });
        },
        (err) => {
          observer.error(err);
        });
    });
    return delWine;
  }

  modifyWine(wine: Wine, ilabel: number, iwine: number) {
    const token = this.auths.getToken();
    const modWine = Observable.create((observer: Observer<string>) => {
      this.http.patch('https://ng-wine-app.firebaseio.com/labels/' + ilabel + '/wines/' + iwine + '.json?auth=' + token, wine)
        .subscribe(
        (res) => {
          observer.next('success');
        },
        (err) => {
          observer.error('error');
        });
    });
    return modWine;
  }

  // shopping cart list service -------------------------------------------------------------------------

  addToShoppingCart(wine: Wine, i: number) {
    const sc = new ShoppingCart(wine, i);
    if (this.shoppingCart.find(shoppingCart => shoppingCart.wine.wineId === sc.wine.wineId)) {
      this.shoppingCart.find(shoppingCart => shoppingCart.wine.wineId === sc.wine.wineId).quantity++;
    } else {
      this.shoppingCart.push(sc);
    }
  }
  removeFromShoppingCart(sc) {
    const index = this.shoppingCart.indexOf(sc);
    if (index !== -1) {
      this.shoppingCart.splice(index, 1);
    }


  }
  reduceQuantityShoppingCart(wine: Wine, i: number) {
    const sc = new ShoppingCart(wine, i);
    if (this.shoppingCart.find(shoppingCart => shoppingCart.wine.wineId === sc.wine.wineId)) {
      if (this.shoppingCart.find(shoppingCart => shoppingCart.wine.wineId === sc.wine.wineId).quantity > 0) {
        this.shoppingCart.find(shoppingCart => shoppingCart.wine.wineId === sc.wine.wineId).quantity--;
      }
    }
  }

  updateShoppingCart(id, quantity) {
    this.shoppingCart.find(shoppingCart => shoppingCart.wine.wineId === id).quantity = quantity;
  }

  getShoppingCart() {
    return this.shoppingCart;
  }

  clearShoppingList() {
    this.shoppingCart = [];
  }

  // making orders --------------------------------------------------------------------------------------------
  generateOrder() {
    const username = this.auths.getUserName();
    const orderID: string = username + Date.now();
    const order: Order = new Order(orderID, Date.now(), this.shoppingCart, 'waiting for approve');
    const genOrd = Observable.create((observer: Observer<string>) => {
      this.http.get('https://ng-wine-app.firebaseio.com/orders/' + username + '.json')
        .map((response: Response) => {
          const res: any[] = response.json();
          return res;
        })
        .subscribe((res) => {
          if (res) {
            const index = res.length;
            firebase.database().ref('orders').child(username).child(index.toString()).set(order)
              .then(response => {
                this.shoppingCart = [];
                observer.next('success');
                this.router.navigate(['/user/orderhistory']);
              })
              .catch(error => {
                observer.error(error);
              })
          } else {
            firebase.database().ref('orders').child(username).child('0').set(order)
              .then(response => {
                this.shoppingCart = [];
                observer.next('success');
                this.router.navigate(['/user/orderhistory']);
              })
              .catch(error => {
                observer.error(error);
              })
          }
        },
        (err) => {
          observer.error(err);
        });
    });
    return genOrd;
  }

  getAllOrders() {
    const gAllOrders = Observable.create((observer: Observer<string>) => {
      this.auths.getAllUsersNames().subscribe(
        (res) => {
          const lastName = res[res.length - 1];
          res.forEach(user => {
            this.http.get('https://ng-wine-app.firebaseio.com/orders/' + user + '.json')
              .map((response: Response) => {
                const orders: Order[] = response.json();
                return orders;
              })
              .subscribe(
              (orders: Order[]) => {
                if (orders) {
                  orders.forEach(order => {
                    this.allOrders.push(order);
                  });
                }
                if (user === lastName) {
                  observer.next('success');
                }
              },
              (error => {
                observer.error(error);
              }));
          });
        },
        (err) => {
          observer.error('No Users were Found');
        });
    });
    return gAllOrders;
  }

  obtainOrders(username: string) {
    return this.http.get('https://ng-wine-app.firebaseio.com/orders/' + username + '.json')
      .map((response: Response) => {
        const orders: Order[] = response.json();
        return orders;
      })
      .catch((error: Response) => {
        return Observable.throw('No Orders were Found');
      });
  }
  getEditOrder() {
    return this.edit;
  }
  clearEditOrder() {
    this.edit = null;
  }
  modifyOrder(orderM: Order) {
    this.shoppingCart = orderM.sclOrder;
    this.edit = orderM.orderId;
    this.router.navigate(['/user/shoppingcart']);
  }
  modifyOrderConfirm(orderId) {
    const username = this.auths.getUserName();
    const modORder = Observable.create((observer: Observer<string>) => {
      this.http.get('https://ng-wine-app.firebaseio.com/orders/' + username + '.json')
        .map((response: Response) => {
          const res: Order[] = response.json();
          return res;
        })
        .subscribe(
        (response: Order[]) => {
          const index = response.findIndex(res => res.orderId === orderId);
          const order: Order = new Order(orderId, Date.now(), this.shoppingCart, 'waiting for approve');
          firebase.database().ref('orders').child(username).child(index.toString()).set(order)
            .then(res => {
              this.shoppingCart = [];
              this.clearEditOrder();
              observer.next('success');
              this.router.navigate(['/user/orderhistory']);
            })
            .catch(error => {
              observer.error(error);
            });
        },
        (error) => {
          observer.error(error);
        });
    });
    return modORder;
  }
  destroyOrder(orderId) {
    const username = this.auths.getUserName();
    this.http.get('https://ng-wine-app.firebaseio.com/orders/' + username + '.json')
      .map((response: Response) => {
        const res: Order[] = response.json();
        return res;
      })
      .subscribe((response: Order[]) => {
        const index = response.findIndex(res => res.orderId === orderId);
        firebase.database().ref('orders').child(username).child(index.toString()).remove();
      });
  }
  //---- Admin Orders Function
  //--- Generate Order List with all users for de Admin Order Section ----
  getOrderList() {
    let ordersList: OrdersList[] = [];
    const gOrderList = Observable.create((observer: Observer<OrdersList[]>) => {
      this.auths.getAllUsersNames().subscribe(
        (res) => {
          const lastName = res[res.length - 1];
          res.forEach(user => {
            this.http.get('https://ng-wine-app.firebaseio.com/orders/' + user + '.json')
              .map((response: Response) => {
                const orders: Order[] = response.json();
                return orders;
              })
              .subscribe(
              (orders: Order[]) => {
                if (orders) {
                  orders.forEach(order => {
                    const ol = new OrdersList(user, order.orderId, order.date, order.sclOrder, order.status);
                    ordersList.push(ol);
                  });
                }
                if (user === lastName) {
                  observer.next(ordersList);
                }
              },
              (error => {
                observer.error(error);
              }));
          });
        },
        (err) => {
          observer.error('No Users were Found');
        });
    });
    return gOrderList;
  }
  //--- Update Order for de Admin Order Section ----
  adminUpdateORder(updateOrder: OrdersList) {
    const token = this.auths.getToken();
    const adUpOr = Observable.create((observer: Observer<OrdersList[]>) => {
      this.http.get('https://ng-wine-app.firebaseio.com/orders/' + updateOrder.userId + '.json?auth=' + token)
        .map((res: Response) => {
          const orders: Order[] = res.json();
          return orders;
        })
        .subscribe(
        (resp) => {
          const index = resp.findIndex(orderResponse => orderResponse.orderId === updateOrder.orderId);
          const order = new Order(updateOrder.orderId, updateOrder.date, updateOrder.sclOrder, updateOrder.status);
          this.http.patch('https://ng-wine-app.firebaseio.com/orders/' + updateOrder.userId + '/' + index + '.json?auth=' + token, order)
            .subscribe(
            (respo) => {
              this.getOrderList().subscribe(
                (respon) => {
                  observer.next(respon);
                },
                (error) => {
                  observer.error(error);
                });
            },
            (error) => {
              observer.error(error);
            });
        },
        (err) => {
          observer.error(err);
        });

    });
    return adUpOr;
  }

  //--- Aprobe users orders and update wines stock service

  adminAprobeOrder(aprobeOrder: OrdersList) {
    const token = this.auths.getToken();
    let allLabels: Label[] = []
    const aAproOrder = Observable.create((observer: Observer<OrdersList>) => {
      this.getAllLabels().subscribe(
        (res) => {
          allLabels = res;
          allLabels.forEach(aL => {
            aprobeOrder.sclOrder.forEach(sc => {
              aL.wines.forEach(wn => {
                if (sc.wine.wineId === wn.wineId) {
                  wn.stock = wn.stock - sc.quantity;
                }
              });
            });
          });
          this.http.put('https://ng-wine-app.firebaseio.com/labels/.json?auth=' + token, allLabels)
            .subscribe(
            (resp) => {
              this.label = allLabels;
              this.adminUpdateORder(aprobeOrder)
                .subscribe((respo) => {
                  observer.next(respo);
                },
                (err) => { observer.error(err); });
            },
            (err) => {
              observer.error(err);
            });
        },
        (err) => {
          observer.error(err);
        });
    });
    return aAproOrder;
  }

  //--- Destroy Order for de Admin Order Section ----
  adminDestroyOrder(updateOrder: OrdersList) {
    const token = this.auths.getToken();
    const adUpOr = Observable.create((observer: Observer<OrdersList[]>) => {
      this.http.get('https://ng-wine-app.firebaseio.com/orders/' + updateOrder.userId + '.json?auth=' + token)
        .map((res: Response) => {
          const orders: Order[] = res.json();
          return orders;
        })
        .subscribe(
        (resp) => {
          const index = resp.findIndex(orderResponse => orderResponse.orderId === updateOrder.orderId);
          let orders: Order[] = resp;
          orders.splice(index, 1);
          this.http.put('https://ng-wine-app.firebaseio.com/orders/' + updateOrder.userId + '.json?auth=' + token, orders)
            .subscribe(
            (respo) => {
              this.getOrderList().subscribe(
                (respon) => {
                  observer.next(respon);
                },
                (error) => {
                  observer.error(error);
                });
            },
            (error) => {
              observer.error(error);
            });
        },
        (err) => {
          observer.error(err);
        });

    });
    return adUpOr;
  }


  label2: Label[] = [
    new Label('Animal', 'Wine made from Organic Vineyards, Smells and tastes their natural state.', '../../assets/img/label-animal.jpg', [
      new Wine('AN-EB', 'Extra Brut', 'Method of processing Charmat', '../../assets/img/animal_extrabrut.jpg', 'Elegant & memoralble', 99, 45, 0),
      new Wine('AN-LO', 'L`Orange ', 'Semillón - Chardonay', '../../assets/img/animal_lorange.jpg', 'Intense, clean and bright', 99, 45, 0),
      new Wine('AN-CH', 'Chardonay', '100% Chardonay', '../../assets/img/animal_chardonnay.jpg', 'Ideal for a sunny afternoon with friends', 99, 45, 0),
      new Wine('AN-MB', 'Malbec', '100% Malbec', '../../assets/img/animal_malbec.jpg', 'Magnificent speciment', 99, 45, 0),
      new Wine('AN-CS', 'Cabernet Saivignon', '100% Cabernet Saivignon', '../../assets/img/animal_cabernetSavignon.jpg', 'Young and Intense', 99, 45, 0)
    ]),
    new Label('Siesta', 'A Dreamer`s Wine', '../../assets/img/label-siesta.jpg', [
      new Wine('SI-CFB', 'Cabernet Franc - Bio', '100% Cabernet Franc', '../../assets/img/siesta_cabernetFranc.jpg', 'Spicey and unique', 99, 45, 0),
      new Wine('SI-CSB', 'Cabernet Sauvignon - Bio', 'Single Vineyards. Vista Flores Vineyards', '../../assets/img/siesta_cabernetSauvignon.jpg', 'Intense, clean and bright', 99, 45, 0),
      new Wine('SI-MB', 'Malbec - Bio', 'Single Vineyards. Vista Flores Vineyards', '../../assets/img/siesta_malbec.jpg', 'Deep and perfectly balanced', 99, 45, 0),
      new Wine('SI-MA', 'Mara - Pinot Noir', '100% Pinot Noir - Río Negro, Patagonia', '../../assets/img/siesta_maraPinotNoir.jpg', 'Fresh and perfectly harmonized', 99, 45, 0),
      new Wine('SI-CF', 'Cabernet Franc', 'Vista Flores Vineyards', '../../assets/img/siesta_cabernetFranc.jpg', 'Lively, interesting and distintive', 99, 45, 0),
      new Wine('SI-CS', 'Cabernet Sauvignon', 'Vista Flores Vineyards', '../../assets/img/siesta_cabernetSauvignon.jpg', 'Lively, interesting and distintive', 99, 45, 0),
      new Wine('SI-M', 'Malbec', 'Vista Flores Vineyards', '../../assets/img/siesta_malbec.jpg', 'Lively, interesting and distintive', 99, 45, 0)
    ]),
    new Label('Alma Negra', 'A secret unveiled through the senses. Dark pleassures. Alchemy. What is eccentric, elegant, aristocratic', '../../assets/img/label-almanegra.jpg', [
      new Wine('AN-RO', 'Rose', 'Method process: Champenoise', '../../assets/img/almanegra_rose.jpg', 'Efervescense of delicate bubles', 99, 45, 0),
      new Wine('AN-BB', 'Blanc De Blancs', 'Method process: Champenoise', '../../assets/img/almanegra_blancoDeblanco.jpg', 'Delicate nuts mousse', 99, 45, 0),
      new Wine('AN-MBB', 'Magnum Blanc de Blancs', 'Method process: Champenoise', '../../assets/img/almanegra_magnumBlanco.jpg', 'Efervescense of delicate bubles', 99, 45, 0),
      new Wine('AN-BL', 'Blanc', 'Secret Blend', '../../assets/img/almanegra_blanco.jpg', 'Lively, interesting and distinctive', 99, 45, 0),
      new Wine('AN-TI', 'Tinto', 'Secret Blend', '../../assets/img/almanegra_tinto.jpg', 'Unveil the hidden notes in between the lines', 99, 45, 0),
      new Wine('AN-GAN', 'Gran Alma Negra', 'secret Blend', '../../assets/img/almanegra_granAN.jpg', 'Enjoy the state of secrecy', 99, 45, 0)
    ]),
    new Label('Tikal', 'The Art of blending malbec. Inspired Wines. Complex Flavours', '../../assets/img/label-tikal.jpg', [
      new Wine('TI-NA', 'Natural', 'Malbec 60% - Syrah 40%', '../../assets/img/tikal_natural.jpg', 'Natural expresion of the virgin grape', 99, 45, 0),
      new Wine('TI-PA', 'Patriota', 'Malbec 60% - Bonarda 40%', '../../assets/img/tikal_patriota.jpg', 'Incredibly fun to drink!', 99, 45, 0),
      new Wine('TI-JU', 'Jubilo', 'Malbec 60% - Cabernet Sauvignon 40%', '../../assets/img/tikal_jubilo.jpg', 'The wine you were looking for the asado', 99, 45, 0),
      new Wine('TI-AM', 'Amorio', 'Malbec 60% - Cabernet Franc 40%', '../../assets/img/tikal_amorio.jpg', 'Aromas for smoaky oak and cherry', 99, 45, 0),
      new Wine('TI-LO', 'Locura', 'Malbec 60% - Cabernet Franc 30% - Torrentes 7% - Criolla 3%', '../../assets/img/tikal_locura.jpg', 'Singular and definetly crazy', 99, 45, 0)
    ]),
    new Label('Padrillos', 'Wine with balls, traditional style - classic. Table wine. Criollo - Gauchesco', '../../assets/img/label-padrillos.jpg', [
      new Wine('PA-SB', 'Suavignon Blanc', '100% Sauvignon Blanc - Uco Valley, Mendoza', '../../assets/img/padrillos_sauvignonBlanc.jpg', 'Splendid wild fruit and freshness', 99, 45, 0),
      new Wine('PA-TF', 'Trifecta', '40% Chenin, 40% Tocai, 20% Torrontes - Agrlo, Rivadavia, Cafayate', '../../assets/img/padrillos_trifecta.jpg', 'Wine of great personality', 99, 45, 0),
      new Wine('PA-PN', 'Pinot Noir', '100% Pinot Noir - Uco Valley, Mendoza', '../../assets/img/padrillos_pinotNoir.jpg', 'Fragrance like freshly cut grass', 99, 45, 0),
      new Wine('PA-MB', 'Malbec', '100% Malbec 60% - Uco Valley, Mendoza', '../../assets/img/padrillos_malbec.jpg', 'Lively and indomitable vitality', 99, 45, 0)
    ])
  ]
  //method to update the database
  //método para actualizar la base de datos
  updateLavelsAndWines() {
    firebase.database().ref('/labels').set(this.label2);
  }





}
