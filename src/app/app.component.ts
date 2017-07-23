import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBONgpaXT8A3bQVMtNwerT075ayZJUtpts',
      authDomain: 'ng-wine-app.firebaseapp.com',
      databaseURL: 'https://ng-wine-app.firebaseio.com',
      projectId: 'ng-wine-app',
      storageBucket: 'ng-wine-app.appspot.com',
      messagingSenderId: '344796102137'
    });
    this.router.navigate(['/home']);
  }

}
