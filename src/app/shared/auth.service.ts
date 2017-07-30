import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';


import { User } from './user.model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Order } from 'app/shared/orders.model';
import { Subject } from 'rxjs/Rx';
import { Message } from 'app/shared/message.model';
import { Thread } from 'app/shared/thread.model';

@Injectable()


export class AuthService {
  token: string;
  user: User;
  orders: Order[];
  userNameHeader = new Subject();

  constructor(private router: Router, private http: Http) { }
  signupUser(user: User) {
    const singUp = Observable.create((observer: Observer<string>) => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .catch(error => {
          observer.error('user not created');
        })
        .then(res => {
          firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .catch(error => {
              observer.error('user created but login fail');
            })
            .then(resp => {
              firebase.auth().currentUser.updateProfile({ displayName: user.username, photoURL: '' })
                .catch(error => {
                  observer.error('update profile fail');
                })
                .then(respo => {
                  firebase.database().ref('users').child(user.username).set(user)
                    .catch(error => {
                      observer.error('update database fail');
                    })
                    .then((respon: Response) => {
                      this.loginUser(user.email, user.password).subscribe(
                        (respons) => {
                          observer.next('success');
                        },
                        (error) => {
                          observer.error('re-Loggin fail');
                        });
                    });
                });
            });
        });
    });
    return singUp;
  }


  redirect() {
    const username = firebase.auth().currentUser.displayName;
    this.getToken();
    this.http.get('https://ng-wine-app.firebaseio.com/users/' + username + '.json?auth=' + this.token)
      .map((response: Response) => {
        this.user = response.json();
        return this.user;
      })
      .subscribe((user: User) => {
        if (this.user.admin.toString() === 'true') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      });
  }

  loginUser(email: string, password: string) {
    const errorMessage = Observable.create((observer: Observer<string>) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
        response => {
          firebase.auth().currentUser.getIdToken()
            .then(
            (token: string) => {
              observer.next('log in correct, continue to redirect');
              this.token = token;
              this.redirect();
            });
        })
        .catch(
        error => {
          console.log(error);
          observer.error('Incorrect User or Password');
        }
        );
    });
    return errorMessage;
  }

  getLoggedUser() {
    return this.user;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
      (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }


  userNameExists(username: string) {
    const response = Observable.create((observer: Observer<string>) => {
      this.http.get('https://ng-wine-app.firebaseio.com/users/' + username + '.json')
        .subscribe(
        (res: Response) => {
          if (res.json()) {
            observer.next('true');
          } else {
            observer.next('false');
          }
        },
        (error: Error) => { console.log(error); }
        );
    });
    return response;
  }

  getUserName() {
    return firebase.auth().currentUser.displayName;
  }

  modifyUserName(userInfo: User) {
    return firebase.auth().currentUser.updateProfile({ displayName: userInfo.username, photoURL: '' });
  }

  modifyUserNameOrders(oldUserName: string, newUserName: string) {
    const response = Observable.create((observer: Observer<string>) => {
      this.http.get('https://ng-wine-app.firebaseio.com/orders/' + oldUserName + '.json?auth=' + this.token)
        .map((res: Response) => {
          const orders: Order[] = res.json();
          return orders;
        })
        .catch((error: Response) => {
          return Observable.throw('No Orders were Found');
        })
        .subscribe((res: Order[]) => {
          this.orders = res;
          this.http.put('https://ng-wine-app.firebaseio.com/orders/' + newUserName + '.json?auth=' + this.token, this.orders)
            .subscribe(
            resp => {
              return this.http.delete('https://ng-wine-app.firebaseio.com/orders/' + oldUserName + '.json?auth=' + this.token)
                .subscribe(
                (respo) => { observer.next('Update Orders Correct'); },
                (error) => { observer.error('Error - Delete Order'); }
                );
            },
            error => {
              observer.error('Error - Put Orders New User');
            });
        });
    });
    return response;
  }

  modifyUserNameUsers(oldUserName: string, newUserName: string) {
    const response = Observable.create((observer: Observer<string>) => {
      this.http.get('https://ng-wine-app.firebaseio.com/users/' + oldUserName + '.json')
        .map((res: Response) => {
          const user: User = res.json();
          return user;
        })
        .catch((error: Response) => {
          return Observable.throw('No Orders were Found');
        })
        .subscribe((res: User) => {
          this.user = res;
          this.user.username = newUserName;
          this.http.put('https://ng-wine-app.firebaseio.com/users/' + newUserName + '.json?auth=' + this.token, this.user)
            .subscribe(
            resp => {
              return this.http.delete('https://ng-wine-app.firebaseio.com/users/' + oldUserName + '.json?auth=' + this.token)
                .subscribe(
                (respo) => { observer.next('Update User Correct'); this.userNameHeader.next(newUserName) },
                (error) => { observer.error('Error - Delete user'); }
                );
            },
            error => {
              observer.error('Error - Put Users new User');
            });
        });
    });
    return response;
  }

  modifyPassword(userInfo: User) {
    return firebase.auth().currentUser.updatePassword(userInfo.password);
  }

  modifyUserInfo(userInfo: User) {
    return this.http.patch('https://ng-wine-app.firebaseio.com/users/' + userInfo.username + '.json?auth=' + this.token, userInfo);
  }

  updateUser(username: string) {
    return this.http.get('https://ng-wine-app.firebaseio.com/users/' + username + '.json?auth=' + this.token)
      .map((response: Response) => {
        const user = response.json();
        return user;
      });
  }

  getAllUsers() {
    return this.http.get('https://ng-wine-app.firebaseio.com/users.json?auth=' + this.token)
      .map((response: Response) => {
        const res = Object.getOwnPropertyNames(response.json());
        return res;
      });
  }

  // ---------------------------------
  openNewThread(type: string, description: string, message: Message) {
    const threadId = this.getUserName() + Date.now();
    const msg: Message[] = [message]
    const thread: Thread = new Thread(threadId, message.usermail, type, description, true, msg);
    const response = Observable.create((observer: Observer<string>) => {
      this.http.get('https://ng-wine-app.firebaseio.com/threads.json?auth=' + this.token)
        .map((res: Response) => {
          const trs: Thread[] = res.json();
          return trs;
        })
        .subscribe(
        (res: Thread[]) => {
          if (res) {
            const index = res.length;
            this.http.put('https://ng-wine-app.firebaseio.com/threads/' + index + '.json?auth=' + this.token, thread)
              .subscribe(
              (respo) => {
                observer.next('success');
              },
              (err) => {
                observer.error('error - putting Thread');
              });
          } else {
            this.http.put('https://ng-wine-app.firebaseio.com/threads/' + 0 + '.json?auth=' + this.token, thread)
              .subscribe(
              (respo) => {
                observer.next('success');
              },
              (err) => {
                observer.error('error - putting Thread');
              });
          }
        },
        (error) => {
          observer.error('error - getting Threads');
        });
    });
    return response;
  }

  getThreads() {
    return this.http.get('https://ng-wine-app.firebaseio.com/threads.json?auth=' + this.token)
      .map((response: Response) => {
        const trs: Thread[] = response.json();
        return trs;
      });
  }

  addMessageInThread(trId: string, msg: Message) {
    const response = Observable.create((observer: Observer<string>) => {
      this.getThreads().subscribe(
        (res: Thread[]) => {
          const index = res.findIndex(thr => thr.idThread === trId);
          this.http.get('https://ng-wine-app.firebaseio.com/threads/' + index + '/messages.json?auth=' + this.token)
            .map((resp: Response) => {
              const message = resp.json();
              return message;
            })
            .subscribe(
            (resp) => {
              const i = resp.length;
              this.http.put('https://ng-wine-app.firebaseio.com/threads/' + index + '/messages/' + i + '.json?auth=' + this.token, msg)
                .subscribe(
                (respo) => {
                  observer.next('sucess');
                },
                (err) => {
                  observer.error('error - put message');
                });
            },
            (err) => {
              observer.error('error - get messages');
            });
        },
        (err) => {
          observer.error('error - get threads');
        });
    });
    return response;
  }

  modifyThreadState(trId: string, open: boolean) {
    const response = Observable.create((observer: Observer<string>) => {
      this.getThreads().subscribe(
        (res: Thread[]) => {
          const index = res.findIndex(thr => thr.idThread === trId);
          this.http.patch('https://ng-wine-app.firebaseio.com/threads/' + index + '.json?auth=' + this.token,
            '{"open": ' + open.toString() + '}')
            .subscribe(
            (resp) => {
              observer.next('sucess');
            },
            (err) => {
              observer.error('error - put message');
            });
        },
        (err) => {
          observer.error('error - get threads');
        });
    });
    return response;
  }
}
