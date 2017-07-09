import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "app/shared/auth.service";
import { User } from '../../../shared/user.model'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private auths: AuthService) { }
  user: User;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'signup-name': new FormControl(null, [Validators.required]),
      'signup-sirname': new FormControl(null, [Validators.required]),
      'signup-username': new FormControl(null, [Validators.required]),
      'signup-email': new FormControl(null, [Validators.required, Validators.email]),
      'signup-adress': new FormControl(null, [Validators.required]),
      'signup-city': new FormControl(null, [Validators.required]),
      'signup-country': new FormControl(null, [Validators.required]),
      'signup-password': new FormControl(null, [Validators.required]),
      'signup-passwordconfirm': new FormControl(null, [Validators.required])
    });
  }
  onSignup() {
    const name = this.signupForm.get('signup-name').value;
    const sirname = this.signupForm.get('signup-sirname').value;
    const username = this.signupForm.get('signup-username').value;
    const email = this.signupForm.get('signup-email').value;
    const password = this.signupForm.get('signup-password').value;
    const adress = this.signupForm.get('signup-adress').value;
    const city = this.signupForm.get('signup-city').value;
    const country = this.signupForm.get('signup-country').value;
    this.user = new User(name, sirname, username, email, adress, city, country, password, "false");
    this.auths.signupUser(this.user);

  }

}
