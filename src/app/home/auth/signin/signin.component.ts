import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm:FormGroup;
  constructor() { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'signin-email': new FormControl(null, [Validators.required, Validators.email]),
      'signin-password': new FormControl(null, [Validators.required])
    });
  }

}
