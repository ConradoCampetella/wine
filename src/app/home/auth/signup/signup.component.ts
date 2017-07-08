import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor() { }

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
  onSubmit(){
    this.signupForm.reset();
  }

}
