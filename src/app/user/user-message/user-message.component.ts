import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.css']
})
export class UserMessageComponent implements OnInit {
  messageForm:FormGroup;

  constructor() { }

  ngOnInit() {
    this.messageForm = new FormGroup({
      'message-type' : new FormControl('',Validators.required),
      'message-subject' : new FormControl('',Validators.required),
      'message-message' : new FormControl('',Validators.required)      
    });
  }
  onSubmit(){
    console.log("submit");
  }

}
