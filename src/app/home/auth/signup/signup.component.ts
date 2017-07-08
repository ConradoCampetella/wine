import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "app/shared/auth.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private auths: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'signup-name': new FormControl(null, [Validators.required]),
      'signup-sirname': new FormControl(null, [Validators.required]),
      'signup-email': new FormControl(null, [Validators.required, Validators.email]),
      'signup-adress': new FormControl(null, [Validators.required]),
      'signup-city': new FormControl(null, [Validators.required]),
      'signup-country': new FormControl(null, [Validators.required])
    });
  }
  onSignup(){
    const email = this.signupForm.get('signup-email').value;
    const password = this.signupForm.get('signup-password').value;
    this.auths.signupUser(email, password);
  }

}
