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
import { User } from "app/shared/user.model";


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
      this.http.put('https://ng-wine-app.firebaseio.com/labels/' + ilabel + '/wines/' + iwine + '.json?auth=' + token, wine)
        .subscribe(
        (res: Response) => {
          let fData = new FormData();
          fData.append('img', imgFile);
          this.http.post('http://ng-wine.herokuapp.com/upload', fData).subscribe(
            resp => {
              observer.next('success');
              this.router.navigate(['/admin/products/list']);
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
    if (this.shoppingCart.length === 0) {
      this.router.navigate(['/user/wines']);
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
    this.router.navigate(['/user/wines']);
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
    const allOrders = Observable.create((observer: Observer<string>) => {
      this.auths.getAllUsers().subscribe(
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
    return allOrders;
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
}
