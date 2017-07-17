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
  password:string;
  username:string;
  user:User;
  pending:boolean =false;
  modify: boolean = false;
  modifyPassword: boolean = false;

  constructor(private auths: AuthService) { }

  ngOnInit() {
    this.user = this.auths.getLoggedUser();
    this.settingsForm = new FormGroup({
      'settings-name': new FormControl({value:this.user.name, disabled:true}, [Validators.required]),
      'settings-sirname': new FormControl({value:this.user.sirname, disabled:true}, [Validators.required]),
      'settings-username': new FormControl({value:this.user.username, disabled:true}, [Validators.required, Validators.minLength(4)], this.userNameExists.bind(this)),
      'settings-email': new FormControl({value:this.user.email, disabled:true}, [Validators.required, Validators.email]),
      'settings-adress': new FormControl({value:this.user.adress, disabled:true}, [Validators.required]),
      'settings-city': new FormControl({value:this.user.city, disabled:true}, [Validators.required]),
      'settings-country': new FormControl({value:this.user.country, disabled:true}, [Validators.required]),
      'settings-password': new FormControl({value:this.user.password, disabled:true}, [Validators.required, Validators.minLength(6)]),
      'settings-passwordconfirm': new FormControl({value:'', disabled:true}, [Validators.required, this.passwordMatchValidator.bind(this)])
    });
    this.settingsForm.statusChanges.subscribe(
      (status) => {
        this.username = this.settingsForm.get('settings-username').value;
        this.password = this.settingsForm.get('settings-password').value;
        if (this.settingsForm.get('settings-username').status === "PENDING") {
          this.pending = true;
        }
        else {
          this.pending = false;
        }
      }
    );
  }

    passwordMatchValidator(control: FormControl): {[s: string]: boolean}{
    if (this.password === control.value){
        return null;
    }
    else{
      return {'passwordsDoNotMatch':true};
    }
  }
    userNameExists(control: FormControl): Promise<any> | Observable <any>{
    const promise = new Promise <any>((resolve, reject)=>{
      setTimeout(()=>{
        this.auths.userNameExists(this.username).subscribe((response:Response)=>{
          if (response.toString() === "true"){
            resolve({'userNameExists':true});
          }
          else{
            resolve(null);
          }
        });
      },1000);
    });
    return promise;
  }
  onModify(){
    this.modify = true;
    this.settingsForm.controls['settings-name'].enable();
    this.settingsForm.controls['settings-sirname'].enable();
    this.settingsForm.controls['settings-username'].enable();
    this.settingsForm.controls['settings-adress'].enable();
    this.settingsForm.controls['settings-city'].enable();
    this.settingsForm.controls['settings-country'].enable();
    this.settingsForm.controls['settings-password'].enable();
    this.settingsForm.controls['settings-passwordconfirm'].enable();
  }
  onModifyPassword(){
    this.modifyPassword = true;
  }
  onClear(){

  }

}
