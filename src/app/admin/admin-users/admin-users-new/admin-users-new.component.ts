import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../../../shared/auth.service';
import { User } from '../../../shared/user.model';

@Component({
  selector: 'app-admin-users-new',
  templateUrl: './admin-users-new.component.html',
  styleUrls: ['./admin-users-new.component.css']
})
export class AdminUsersNewComponent implements OnInit {

  adminNewUserForm: FormGroup;
  password: string;
  username: string;
  usermail: string;
  pendingUserName = false;
  pendingUserMail = false;
  userAsync = false;
  mailAsync = false;
  spinnerVisible = false;
  singinError = false;

  constructor(private auths: AuthService) { }

  ngOnInit() {

    this.adminNewUserForm = new FormGroup({
      'adminNewUser-name': new FormControl('', [Validators.required]),
      'adminNewUser-sirname': new FormControl('', [Validators.required]),
      'adminNewUser-username': new FormControl('', [Validators.required, Validators.minLength(4)],
        this.userNameExists.bind(this)),
      'adminNewUser-email': new FormControl('', [Validators.required, Validators.email],
        this.userMailExists.bind(this)),
      'adminNewUser-adress': new FormControl('', [Validators.required]),
      'adminNewUser-city': new FormControl('', [Validators.required]),
      'adminNewUser-country': new FormControl('', [Validators.required]),
      'adminNewUser-password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'adminNewUser-passwordconfirm': new FormControl('', [Validators.required,
      this.passwordMatchValidator.bind(this)]),
      'adminNewUser-rights': new FormControl('false', [Validators.required]),
    });
    this.adminNewUserForm.statusChanges.subscribe(
      (status) => {
        this.username = this.adminNewUserForm.get('adminNewUser-username').value;
        this.usermail = this.adminNewUserForm.get('adminNewUser-email').value;
        this.password = this.adminNewUserForm.get('adminNewUser-password').value;
        if (this.adminNewUserForm.get('adminNewUser-username').status === 'PENDING') {
          this.pendingUserName = true;
        } else {
          this.pendingUserName = false;
        }
        if (this.adminNewUserForm.get('adminNewUser-email').status === 'PENDING') {
          this.pendingUserMail = true;
        } else {
          this.pendingUserMail = false;
        }
      });
  }

  passwordMatchValidator(control: FormControl): { [s: string]: boolean } {
    if (this.password === control.value) {
      return null;
    } else {
      return { 'passwordsDoNotMatch': true };
    }
  }


  userNameExists(control: FormControl): Promise<any> | Observable<any> {
    this.userAsync = true;
    const promise = new Promise<any>((resolve, reject) => {
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

  userMailExists(control: FormControl): Promise<any> | Observable<any> {
    this.mailAsync = true;
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        this.auths.userMailExists(this.usermail).subscribe((response: Response) => {
          if (response.toString() === 'true') {
            resolve({ 'userMailExists': true });
          } else {
            resolve(null);
          }
        });
      }, 1000);
    });
    return promise;
  }

  onSignup() {
    const name = this.adminNewUserForm.get('adminNewUser-name').value;
    const surname = this.adminNewUserForm.get('adminNewUser-sirname').value;
    const adress = this.adminNewUserForm.get('adminNewUser-adress').value;
    const city = this.adminNewUserForm.get('adminNewUser-city').value;
    const country = this.adminNewUserForm.get('adminNewUser-country').value;
    const email = this.usermail;
    const username = this.username;
    const password = this.password;
    this.spinnerVisible = true;
    this.singinError = false;
    const admin = this.adminNewUserForm.get('adminNewUser-rights').value;
    const user = new User(name, surname, username, email, adress, city, country, password, admin);
    this.auths.createNewUser(user).subscribe(
      (res) => {
        this.singinError = false;
        this.spinnerVisible = false;
      },
      (err) => {
        this.singinError = true;
        this.spinnerVisible = false;
      });

  }

}
