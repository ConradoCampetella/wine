import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs/Rx";

import { AuthService } from "app/shared/auth.service";
import { User } from "app/shared/user.model";

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
  pending: boolean = false;
  modify: boolean = false;
  modifyPassword: boolean = false;
  modifyUser: boolean = false;
  userAsync: boolean = false;


  constructor(private auths: AuthService) { }

  ngOnInit() {
    this.user = this.auths.getLoggedUser();
    this.settingsForm = new FormGroup({
      'settings-name': new FormControl({ value: this.user.name, disabled: true }, [Validators.required]),
      'settings-sirname': new FormControl({ value: this.user.sirname, disabled: true }, [Validators.required]),
      'settings-username': new FormControl({ value: this.user.username, disabled: true }, [Validators.required, Validators.minLength(4)], this.userNameExists.bind(this)),
      'settings-email': new FormControl({ value: this.user.email, disabled: true }, [Validators.required, Validators.email]),
      'settings-adress': new FormControl({ value: this.user.adress, disabled: true }, [Validators.required]),
      'settings-city': new FormControl({ value: this.user.city, disabled: true }, [Validators.required]),
      'settings-country': new FormControl({ value: this.user.country, disabled: true }, [Validators.required]),
      'settings-password': new FormControl({ value: this.user.password, disabled: true }, [Validators.required, Validators.minLength(6)]),
      'settings-oldpassword': new FormControl({ value: this.user.password, disabled: true }, [Validators.required, Validators.minLength(6), this.oldPasswordMatchValidator.bind(this)]),
      'settings-newpassword': new FormControl({ value: this.user.password, disabled: true }, [Validators.required, Validators.minLength(6)]),
      'settings-passwordconfirm': new FormControl({ value: '', disabled: true }, [Validators.required, this.passwordMatchValidator.bind(this)])
    });
    this.settingsForm.statusChanges.subscribe(
      (status) => {
        this.username = this.settingsForm.get('settings-username').value;
        this.password = this.settingsForm.get('settings-newpassword').value;
        if (this.settingsForm.get('settings-username').status === "PENDING") {
          this.pending = true;
        }
        else {
          this.pending = false;
        }
      }
    );
  }

  passwordMatchValidator(control: FormControl): { [s: string]: boolean } {
    if (this.password === control.value) {
      return null;
    }
    else {
      return { 'passwordsDoNotMatch': true };
    }
  }

  oldPasswordMatchValidator(control: FormControl): { [s: string]: boolean } {
    if (this.user.password === control.value) {
      return null;
    }
    else {
      return { 'passwordsDoNotMatch': true };
    }
  }

  userNameExists(control: FormControl): Promise<any> | Observable<any> {
    this.userAsync = true;
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        this.auths.userNameExists(this.username).subscribe((response: Response) => {
          if (response.toString() === "true") {
            resolve({ 'userNameExists': true });
          }
          else {
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
      this.settingsForm.controls['settings-name'].markAsPristine;
      this.settingsForm.controls['settings-sirname'].markAsPristine;
      this.settingsForm.controls['settings-adress'].markAsPristine;
      this.settingsForm.controls['settings-city'].markAsPristine;
      this.settingsForm.controls['settings-country'].markAsPristine;
      this.settingsForm.controls['settings-name'].disable();
      this.settingsForm.controls['settings-sirname'].disable();
      this.settingsForm.controls['settings-adress'].disable();
      this.settingsForm.controls['settings-city'].disable();
      this.settingsForm.controls['settings-country'].disable();
      this.settingsForm.controls['settings-name'].setValue(this.user.name);
      this.settingsForm.controls['settings-sirname'].setValue(this.user.sirname);
      this.settingsForm.controls['settings-adress'].setValue(this.user.adress);
      this.settingsForm.controls['settings-city'].setValue(this.user.city);
      this.settingsForm.controls['settings-country'].setValue(this.user.country);
    }
    else {
      this.modify = true;
      this.settingsForm.controls['settings-name'].enable();
      this.settingsForm.controls['settings-sirname'].enable();
      this.settingsForm.controls['settings-adress'].enable();
      this.settingsForm.controls['settings-city'].enable();
      this.settingsForm.controls['settings-country'].enable();
    }

  }

  onClear() {
    this.settingsForm.controls['settings-name'].setValue('');
    this.settingsForm.controls['settings-sirname'].setValue('');
    this.settingsForm.controls['settings-adress'].setValue('');
    this.settingsForm.controls['settings-city'].setValue('');
    this.settingsForm.controls['settings-country'].setValue('');
  }
  modifyValid() {
    if (this.settingsForm.controls['settings-name'].pristine
      && this.settingsForm.controls['settings-sirname'].pristine
      && this.settingsForm.controls['settings-adress'].pristine
      && this.settingsForm.controls['settings-city'].pristine
      && this.settingsForm.controls['settings-country'].pristine) {
      return true;
    }
    else if (this.settingsForm.controls['settings-name'].valid
      && this.settingsForm.controls['settings-sirname'].valid
      && this.settingsForm.controls['settings-adress'].valid
      && this.settingsForm.controls['settings-city'].valid
      && this.settingsForm.controls['settings-country'].valid) {
      return false;
    }
    else {
      return true;
    }

  }

  onModifyPassword() {
    if (this.modifyPassword) {
      this.modifyPassword = false;
      this.settingsForm.controls['settings-oldpassword'].disable();
      this.settingsForm.controls['settings-newpassword'].disable();
      this.settingsForm.controls['settings-passwordconfirm'].disable();
    }
    else {
      this.modifyPassword = true;
      this.settingsForm.controls['settings-oldpassword'].enable();
      this.settingsForm.controls['settings-newpassword'].enable();
      this.settingsForm.controls['settings-passwordconfirm'].enable();
    }
  }
  onClearPassword() {
    this.settingsForm.controls['settings-oldpassword'].setValue('');
    this.settingsForm.controls['settings-newpassword'].setValue('');
    this.settingsForm.controls['settings-passwordconfirm'].setValue('');
  }
  modifyPasswordValid() {
    if (this.settingsForm.controls['settings-oldpassword'].valid && this.settingsForm.controls['settings-newpassword'].valid && this.settingsForm.controls['settings-passwordconfirm'].valid) {
      return false;
    }
    else {
      return true;
    }

  }

  onModifyUser() {
    if (this.modifyUser) {
      this.modifyUser = false;
      this.settingsForm.controls['settings-username'].disable();
      this.settingsForm.controls['settings-username'].markAsPristine;
      this.settingsForm.controls['settings-username'].setValue(this.user.username);
    }
    else {
      this.modifyUser = true;
      this.settingsForm.controls['settings-username'].enable();
    }
  }
  onClearUser() {
    this.settingsForm.controls['settings-username'].setValue('');
  }

}
