import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';
import { User } from '../../../shared/user.model'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  password: string;
  username: string;
  user: User;
  pending = false;

  constructor(private auths: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'signup-name': new FormControl(null, [Validators.required]),
      'signup-sirname': new FormControl(null, [Validators.required]),
      'signup-username': new FormControl(null, [Validators.required, Validators.minLength(4)], this.userNameExists.bind(this)),
      'signup-email': new FormControl(null, [Validators.required, Validators.email]),
      'signup-adress': new FormControl(null, [Validators.required]),
      'signup-city': new FormControl(null, [Validators.required]),
      'signup-country': new FormControl(null, [Validators.required]),
      'signup-password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'signup-passwordconfirm': new FormControl('', [Validators.required, this.passwordMatchValidator.bind(this)])
    });
    this.signupForm.statusChanges.subscribe(
      (status) => {
        this.username = this.signupForm.get('signup-username').value;
        this.password = this.signupForm.get('signup-password').value;
        if (this.signupForm.get('signup-username').status === 'PENDING') {
          this.pending = true;
        } else {
          this.pending = false;
        }
      }
    );
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
    this.user = new User(name, sirname, username, email, adress, city, country, password, 'false');
    this.auths.signupUser(this.user);

  }

  passwordMatchValidator(control: FormControl): { [s: string]: boolean } {
    if (this.password === control.value) {
      return null;
    } else {
      return { 'passwordsDoNotMatch': true };
    }
  }
  userNameExists(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      console.log(this.auths.userNameExists(this.username));
      setTimeout(() => {
        this.auths.userNameExists(this.username).subscribe((response: Response) => {
          if (response.toString() === 'true') {
            resolve({ 'userNameExists': true });
          } else {
            resolve(null);
          }
        });
      }, 1000);
    });
    return promise;
  }
}
