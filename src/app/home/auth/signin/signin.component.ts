import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "app/shared/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm:FormGroup;
  constructor(private auths: AuthService) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'signin-email': new FormControl(null, [Validators.required, Validators.email]),
      'signin-password': new FormControl(null, [Validators.required])
    });
  }

    onLogin(){
    const email = this.signinForm.get('signin-email').value;
    const password = this.signinForm.get('signin-password').value;
    this.auths.loginUser(email, password);    
  }

}
