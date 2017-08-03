import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params } from '@angular/router';

import { AuthService } from '../../../shared/auth.service';
import { User } from '../../../shared/user.model';

@Component({
  selector: 'app-admin-users-edit',
  templateUrl: './admin-users-edit.component.html',
  styleUrls: ['./admin-users-edit.component.css']
})
export class AdminUsersEditComponent implements OnInit {

  adminUserForm: FormGroup;
  password: string;
  username: string;
  user: User;
  pending = false;
  modify = false;
  modifyPassword = false;
  modifyUser = false;
  userAsync = false;
  updateInfoSuccess = false;
  updateInfoError = false;
  updateInfoSpinner = false;
  updatePasswordSuccess = false;
  updatePasswordError = false;
  updatePasswordSpinner = false;
  updateUserNameSuccess = false;
  updateUserNameError = false;
  updateUserNameSpinner = false;

  constructor(private auths: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['usermail']) {
        const um = params['usermail'];
        this.user = this.auths.allUsers.find(user => user.email === um);
      } else {
        this.user = new User('', '', '', '', '', '', '', '', '');
      }

    });
    this.adminUserForm = new FormGroup({
      'adminUser-name': new FormControl({ value: this.user.name, disabled: true }, [Validators.required]),
      'adminUser-sirname': new FormControl({ value: this.user.sirname, disabled: true }, [Validators.required]),
      'adminUser-username': new FormControl({ value: this.user.username, disabled: true }, [Validators.required, Validators.minLength(4)],
        this.userNameExists.bind(this)),
      'adminUser-email': new FormControl({ value: this.user.email, disabled: true }, [Validators.required, Validators.email]),
      'adminUser-adress': new FormControl({ value: this.user.adress, disabled: true }, [Validators.required]),
      'adminUser-city': new FormControl({ value: this.user.city, disabled: true }, [Validators.required]),
      'adminUser-country': new FormControl({ value: this.user.country, disabled: true }, [Validators.required]),
      'adminUser-password': new FormControl({ value: this.user.password, disabled: true }, [Validators.required, Validators.minLength(6)]),
      'adminUser-oldpassword': new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(6),
      this.oldPasswordMatchValidator.bind(this)]),
      'adminUser-newpassword': new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]),
      'adminUser-passwordconfirm': new FormControl({ value: '', disabled: true }, [Validators.required,
      this.passwordMatchValidator.bind(this)])
    });
    this.adminUserForm.statusChanges.subscribe(
      (status) => {
        this.username = this.adminUserForm.get('adminUser-username').value;
        this.password = this.adminUserForm.get('adminUser-newpassword').value;
        if (this.adminUserForm.get('adminUser-username').status === 'PENDING') {
          this.pending = true;
        } else {
          this.pending = false;
        }
      }
    );
  }

  passwordMatchValidator(control: FormControl): { [s: string]: boolean } {
    if (this.password === control.value) {
      return null;
    } else {
      return { 'passwordsDoNotMatch': true };
    }
  }

  oldPasswordMatchValidator(control: FormControl): { [s: string]: boolean } {
    if (this.user.password === control.value) {
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
  onModify() {
    if (this.modify) {
      this.modify = false;
      this.adminUserForm.get('adminUser-name').markAsPristine();
      this.adminUserForm.get('adminUser-sirname').markAsPristine();
      this.adminUserForm.get('adminUser-adress').markAsPristine();
      this.adminUserForm.get('adminUser-city').markAsPristine();
      this.adminUserForm.get('adminUser-country').markAsPristine();
      this.adminUserForm.get('adminUser-name').disable();
      this.adminUserForm.get('adminUser-sirname').disable();
      this.adminUserForm.get('adminUser-adress').disable();
      this.adminUserForm.get('adminUser-city').disable();
      this.adminUserForm.get('adminUser-country').disable();
      this.adminUserForm.get('adminUser-name').setValue(this.user.name);
      this.adminUserForm.get('adminUser-sirname').setValue(this.user.sirname);
      this.adminUserForm.get('adminUser-adress').setValue(this.user.adress);
      this.adminUserForm.get('adminUser-city').setValue(this.user.city);
      this.adminUserForm.get('adminUser-country').setValue(this.user.country);
      this.updateInfoSuccess = false;
      this.updateInfoError = false;
      this.updateInfoSpinner = false;
    } else {
      this.modify = true;
      this.adminUserForm.get('adminUser-name').enable();
      this.adminUserForm.get('adminUser-sirname').enable();
      this.adminUserForm.get('adminUser-adress').enable();
      this.adminUserForm.get('adminUser-city').enable();
      this.adminUserForm.get('adminUser-country').enable();
    }

  }

  onClear() {
    this.adminUserForm.get('adminUser-name').setValue('');
    this.adminUserForm.get('adminUser-sirname').setValue('');
    this.adminUserForm.get('adminUser-adress').setValue('');
    this.adminUserForm.get('adminUser-city').setValue('');
    this.adminUserForm.get('adminUser-country').setValue('');
  }
  modifyValid() {
    if (this.adminUserForm.get('adminUser-name').pristine
      && this.adminUserForm.get('adminUser-sirname').pristine
      && this.adminUserForm.get('adminUser-adress').pristine
      && this.adminUserForm.get('adminUser-city').pristine
      && this.adminUserForm.get('adminUser-country').pristine) {
      return true;
    } else if (this.adminUserForm.get('adminUser-name').valid
      && this.adminUserForm.get('adminUser-sirname').valid
      && this.adminUserForm.get('adminUser-adress').valid
      && this.adminUserForm.get('adminUser-city').valid
      && this.adminUserForm.get('adminUser-country').valid) {
      return false;
    } else {
      return true;
    }
  }

  onUpdateInfo() {
    this.updateInfoSuccess = false;
    this.updateInfoError = false;
    this.updateInfoSpinner = true;
    const name = this.adminUserForm.get('adminUser-name').value;
    const sirname = this.adminUserForm.get('adminUser-sirname').value;
    const adress = this.adminUserForm.get('adminUser-adress').value;
    const city = this.adminUserForm.get('adminUser-city').value;
    const country = this.adminUserForm.get('adminUser-country').value;
    const userMod = new User(name, sirname, this.user.username, this.user.email, adress,
      city, country, this.user.password, this.user.admin);
    this.auths.modifyUserInfo(userMod).subscribe(
      res => {
        this.updateInfoSuccess = true;
        this.auths.updateUser(this.user.username).subscribe((response) => {
          this.user = response;
          this.adminUserForm.get('adminUser-name').setValue(this.user.name);
          this.adminUserForm.get('adminUser-sirname').setValue(this.user.sirname);
          this.adminUserForm.get('adminUser-adress').setValue(this.user.adress);
          this.adminUserForm.get('adminUser-city').setValue(this.user.city);
          this.adminUserForm.get('adminUser-country').setValue(this.user.country);
          this.updateInfoSpinner = false;
        }, (error) => {
          this.updateInfoSpinner = false;
        });
      },
      error => {
        this.updateInfoSpinner = false;
        this.updateInfoError = true;
      });
  }

  onModifyPassword() {
    if (this.modifyPassword) {
      this.modifyPassword = false;
      this.updatePasswordSuccess = false;
      this.updatePasswordError = false;
      this.updatePasswordSpinner = false;
      this.adminUserForm.get('adminUser-oldpassword').disable();
      this.adminUserForm.get('adminUser-newpassword').disable();
      this.adminUserForm.get('adminUser-passwordconfirm').disable();
    } else {
      this.modifyPassword = true;
      this.adminUserForm.get('adminUser-oldpassword').enable();
      this.adminUserForm.get('adminUser-newpassword').enable();
      this.adminUserForm.get('adminUser-passwordconfirm').enable();
    }
  }

  onClearPassword() {
    this.adminUserForm.get('adminUser-oldpassword').setValue('');
    this.adminUserForm.get('adminUser-newpassword').setValue('');
    this.adminUserForm.get('adminUser-passwordconfirm').setValue('');
  }
  modifyPasswordValid() {
    if (this.adminUserForm.get('adminUser-oldpassword').valid
      && this.adminUserForm.get('adminUser-newpassword').valid
      && this.adminUserForm.get('adminUser-passwordconfirm').valid) {
      return false;
    } else {
      return true;
    }
  }
  onUpdatePassword() {
    this.updatePasswordSuccess = false;
    this.updatePasswordError = false;
    this.updatePasswordSpinner = true;
    this.user.password = this.adminUserForm.get('adminUser-newpassword').value;
    this.auths.modifyPassword(this.user)
      .then(res => {
        this.auths.modifyUserInfo(this.user).subscribe(respo => {
          this.updatePasswordSuccess = true;
          this.auths.updateUser(this.user.username).subscribe(
            (response) => {
              this.user = response;
              this.adminUserForm.get('adminUser-password').setValue(this.user.password);
              this.updatePasswordSpinner = false;
            },
            (error) => {
              this.updatePasswordSpinner = false;
            });
        });
      })
      .catch(err => {
        this.updatePasswordSpinner = false;
        this.updatePasswordError = true;
      });
  }

  onModifyUser() {
    if (this.modifyUser) {
      this.modifyUser = false;
      this.updateUserNameError = false;
      this.updateUserNameSuccess = false;
      this.updateUserNameSpinner = false;
      this.adminUserForm.get('adminUser-username').disable();
      this.adminUserForm.get('adminUser-username').markAsPristine();
      this.adminUserForm.get('adminUser-username').setValue(this.user.username);
    } else {
      this.modifyUser = true;
      this.adminUserForm.get('adminUser-username').enable();
    }
  }

  onClearUser() {
    this.adminUserForm.get('adminUser-username').setValue('');
  }

  onUpdateUserName() {
    this.updateUserNameError = false;
    this.updateUserNameSuccess = false;
    this.updateUserNameSpinner = true;
    const oldUserName: string = this.user.username;
    this.user.username = this.adminUserForm.get('adminUser-username').value;
    this.auths.modifyUserName(this.user)
      .then(response => {
        this.auths.modifyUserNameOrders(oldUserName, this.user.username).subscribe(
          (res) => {
            if (res) {
              this.auths.modifyUserNameUsers(oldUserName, this.user.username).subscribe(
                (resp) => {
                  this.updateUserNameSpinner = false;
                  this.updateUserNameSuccess = true;
                  this.adminUserForm.get('adminUser-username').markAsPristine();
                  this.adminUserForm.get('adminUser-username').setValue(this.user.username);
                },
                (err) => {
                  this.updateUserNameSpinner = false;
                  this.updateUserNameError = true;
                });
            }
          },
          (err) => {
            this.updateUserNameSpinner = false;
            this.updateUserNameError = true;
          });
      })
      .catch(err => {
        this.updateUserNameSpinner = false;
        this.updateUserNameError = true;
      });
  }

}
