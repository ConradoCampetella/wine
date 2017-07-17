import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';


import { User } from './user.model';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subscription } from "rxjs/Subscription";

@Injectable()


export class AuthService {
  token: string;
  user: User;

  constructor(private router: Router, private http: Http) { }

  signupUser(user: User) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .catch(
      error => console.log(error)
      ).then(response => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(response => {
          firebase.database().ref('users').child(user.username).set(user).then((response: Response) => {
            firebase.auth().currentUser.updateProfile({ displayName: user.username, photoURL: "" });
          })
        })
      });
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
        if (this.user.admin.toString() == "true") {
          this.router.navigate(['/admin']);
        }
        else {
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
        (response: Response) => {
          if (response.json()) {
            observer.next("true");
          }
          else {
            observer.next("false");
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

  modifyUserName() {

  }
  modifyPassword(userInfo: User) {
    return firebase.auth().currentUser.updatePassword(userInfo.password);
  }

  modifyUserInfo(userInfo: User) {
    return this.http.patch('https://ng-wine-app.firebaseio.com/users/' + userInfo.username + '.json?auth=' + this.token, userInfo);
  }

  updateUser(username:string) {
    return this.http.get('https://ng-wine-app.firebaseio.com/users/' + username + '.json?auth=' + this.token)
      .map((response: Response) => {
        const user = response.json();
        return user;
      });
  }


}
