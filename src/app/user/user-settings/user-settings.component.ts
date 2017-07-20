import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../../shared/auth.service';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  settingsForm: FormGroup;
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
  updatePasswordSuccess = false;
  updatePasswordError = false;
  updateUserNameSuccess = false;
  updateUserNameError = false;

  constructor(private auths: AuthService) { }

  ngOnInit() {
    this.user = this.auths.getLoggedUser();
    this.settingsForm = new FormGroup({
      'settings-name': new FormControl({ value: this.user.name, disabled: true }, [Validators.required]),
      'settings-sirname': new FormControl({ value: this.user.sirname, disabled: true }, [Validators.required]),
      'settings-username': new FormControl({ value: this.user.username, disabled: true }, [Validators.required, Validators.minLength(4)],
        this.userNameExists.bind(this)),
      'settings-email': new FormControl({ value: this.user.email, disabled: true }, [Validators.required, Validators.email]),
      'settings-adress': new FormControl({ value: this.user.adress, disabled: true }, [Validators.required]),
      'settings-city': new FormControl({ value: this.user.city, disabled: true }, [Validators.required]),
      'settings-country': new FormControl({ value: this.user.country, disabled: true }, [Validators.required]),
      'settings-password': new FormControl({ value: this.user.password, disabled: true }, [Validators.required, Validators.minLength(6)]),
      'settings-oldpassword': new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(6),
        this.oldPasswordMatchValidator.bind(this)]),
      'settings-newpassword': new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]),
      'settings-passwordconfirm': new FormControl({ value: '', disabled: true }, [Validators.required,
          this.passwordMatchValidator.bind(this)])
    });
    this.settingsForm.statusChanges.subscribe(
      (status) => {
        this.username = this.settingsForm.get('settings-username').value;
        this.password = this.settingsForm.get('settings-newpassword').value;
        if (this.settingsForm.get('settings-username').status === 'PENDING') {
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
      this.settingsForm.get('settings-name').markAsPristine();
      this.settingsForm.get('settings-sirname').markAsPristine();
      this.settingsForm.get('settings-adress').markAsPristine();
      this.settingsForm.get('settings-city').markAsPristine();
      this.settingsForm.get('settings-country').markAsPristine();
      this.settingsForm.get('settings-name').disable();
      this.settingsForm.get('settings-sirname').disable();
      this.settingsForm.get('settings-adress').disable();
      this.settingsForm.get('settings-city').disable();
      this.settingsForm.get('settings-country').disable();
      this.settingsForm.get('settings-name').setValue(this.user.name);
      this.settingsForm.get('settings-sirname').setValue(this.user.sirname);
      this.settingsForm.get('settings-adress').setValue(this.user.adress);
      this.settingsForm.get('settings-city').setValue(this.user.city);
      this.settingsForm.get('settings-country').setValue(this.user.country);
      this.updateInfoSuccess = false;
      this.updateInfoError = false;
    } else {
      this.modify = true;
      this.settingsForm.get('settings-name').enable();
      this.settingsForm.get('settings-sirname').enable();
      this.settingsForm.get('settings-adress').enable();
      this.settingsForm.get('settings-city').enable();
      this.settingsForm.get('settings-country').enable();
    }

  }

  onClear() {
    this.settingsForm.get('settings-name').setValue('');
    this.settingsForm.get('settings-sirname').setValue('');
    this.settingsForm.get('settings-adress').setValue('');
    this.settingsForm.get('settings-city').setValue('');
    this.settingsForm.get('settings-country').setValue('');
  }
  modifyValid() {
    if (this.settingsForm.get('settings-name').pristine
      && this.settingsForm.get('settings-sirname').pristine
      && this.settingsForm.get('settings-adress').pristine
      && this.settingsForm.get('settings-city').pristine
      && this.settingsForm.get('settings-country').pristine) {
      return true;
    } else if (this.settingsForm.get('settings-name').valid
      && this.settingsForm.get('settings-sirname').valid
      && this.settingsForm.get('settings-adress').valid
      && this.settingsForm.get('settings-city').valid
      && this.settingsForm.get('settings-country').valid) {
      return false;
    } else {
      return true;
    }
  }

  onUpdateInfo() {
    this.updateInfoSuccess = false;
    this.updateInfoError = false;
    const name = this.settingsForm.get('settings-name').value;
    const sirname = this.settingsForm.get('settings-sirname').value;
    const adress = this.settingsForm.get('settings-adress').value;
    const city = this.settingsForm.get('settings-city').value;
    const country = this.settingsForm.get('settings-country').value;
    const userMod = new User(name, sirname, this.user.username, this.user.email, adress,
      city, country, this.user.password, this.user.admin);
    this.auths.modifyUserInfo(userMod).subscribe(
      res => {
        this.updateInfoSuccess = true;
        this.auths.updateUser(this.user.username).subscribe((response) => {
          this.user = response;
          this.settingsForm.get('settings-name').setValue(this.user.name);
          this.settingsForm.get('settings-sirname').setValue(this.user.sirname);
          this.settingsForm.get('settings-adress').setValue(this.user.adress);
          this.settingsForm.get('settings-city').setValue(this.user.city);
          this.settingsForm.get('settings-country').setValue(this.user.country);
        })
      },
      error => {
        this.updateInfoError = true;
      });
  }

  onModifyPassword() {
    if (this.modifyPassword) {
      this.modifyPassword = false;
      this.updatePasswordSuccess = false;
      this.updatePasswordError = false;
      this.settingsForm.get('settings-oldpassword').disable();
      this.settingsForm.get('settings-newpassword').disable();
      this.settingsForm.get('settings-passwordconfirm').disable();
    } else {
      this.modifyPassword = true;
      this.settingsForm.get('settings-oldpassword').enable();
      this.settingsForm.get('settings-newpassword').enable();
      this.settingsForm.get('settings-passwordconfirm').enable();
    }
  }

  onClearPassword() {
    this.settingsForm.get('settings-oldpassword').setValue('');
    this.settingsForm.get('settings-newpassword').setValue('');
    this.settingsForm.get('settings-passwordconfirm').setValue('');
  }
  modifyPasswordValid() {
    if (this.settingsForm.get('settings-oldpassword').valid
      && this.settingsForm.get('settings-newpassword').valid
      && this.settingsForm.get('settings-passwordconfirm').valid) {
      return false;
    } else {
      return true;
    }
  }
  onUpdatePassword() {
    this.updatePasswordSuccess = false;
    this.updatePasswordError = false;
    this.user.password = this.settingsForm.get('settings-newpassword').value;
    this.auths.modifyPassword(this.user)
      .then(res => {
        this.auths.modifyUserInfo(this.user).subscribe(respo => {
          this.updatePasswordSuccess = true;
          this.auths.updateUser(this.user.username).subscribe((response) => {
            this.user = response;
            this.settingsForm.get('settings-password').setValue(this.user.password);
          })
        })
      })
      .catch(err => {
        this.updatePasswordError = true;
      })
  }

  onModifyUser() {
    if (this.modifyUser) {
      this.modifyUser = false;
      this.updateUserNameError = false;
      this.updateUserNameSuccess = false;
      this.settingsForm.get('settings-username').disable();
      this.settingsForm.get('settings-username').markAsPristine();
      this.settingsForm.get('settings-username').setValue(this.user.username);
    } else {
      this.modifyUser = true;
      this.settingsForm.get('settings-username').enable();
    }
  }

  onClearUser() {
    this.settingsForm.get('settings-username').setValue('');
  }

  onUpdateUserName() {
    this.updateUserNameError = false;
    this.updateUserNameSuccess = false;
    const oldUserName: string = this.user.username;
    this.user.username = this.settingsForm.get('settings-username').value;
    this.auths.modifyUserName(this.user)
      .then(response => {
        this.auths.modifyUserNameOrders(oldUserName, this.user.username).subscribe(
          (res) => {
            if (res) {
              this.auths.modifyUserNameUsers(oldUserName, this.user.username).subscribe(
                (resp) => {
                  this.updateUserNameSuccess = true;
                  this.settingsForm.get('settings-username').markAsPristine();
                  this.settingsForm.get('settings-username').setValue(this.user.username);
                },
                (err) => { this.updateUserNameError = true; }
              );
            }
          },
          (err) => { this.updateUserNameError = true; });
      })
      .catch(err => { console.log('Error - Update profile') });
  }

}
