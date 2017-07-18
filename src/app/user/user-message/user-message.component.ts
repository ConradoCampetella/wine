import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Message } from "app/shared/message.model";
import { AuthService } from "app/shared/auth.service";

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.css']
})
export class UserMessageComponent implements OnInit {
  messageForm: FormGroup;
  message: Message;
  messageSuccess:boolean = false;
  messageError:boolean = false;

  constructor(private auths: AuthService) { }

  ngOnInit() {
    this.messageForm = new FormGroup({
      'message-type': new FormControl('', Validators.required),
      'message-subject': new FormControl('', Validators.required),
      'message-message': new FormControl('', Validators.required)
    });
  }
  onSubmit() {
    const user = this.auths.getLoggedUser();
    const type = this.messageForm.get('message-type').value;
    const subject = this.messageForm.get('message-subject').value;
    const msg = this.messageForm.get('message-message').value;
    this.message = new Message(user.email, user.username, Date.now(), type, subject, msg);
    this.auths.sendMessage(this.message).subscribe(
      (res)=>{
        this.messageSuccess = true;
        this.messageForm.reset();
      },
      (err)=>{
        this.messageError = true;
      }
    )
  }

}
