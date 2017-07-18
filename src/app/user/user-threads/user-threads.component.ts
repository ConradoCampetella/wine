import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "app/shared/auth.service";
import { Message } from "app/shared/message.model";

@Component({
  selector: 'app-user-threads',
  templateUrl: './user-threads.component.html',
  styleUrls: ['./user-threads.component.css']
})
export class UserThreadsComponent implements OnInit {
  threadForm:FormGroup;
  newThread:boolean = false;
  newThreadSuccess:boolean = false;
  newThreadError:boolean = false;

  constructor(private auths:AuthService) { }

  ngOnInit() {
    this.threadForm = new FormGroup({
      'threadType': new FormControl('',Validators.required),
      'threadDescription': new FormControl('',Validators.required),
      'threadMessage': new FormControl('',Validators.required)
    });
  }

  onOpenNewThread(){
    this.newThread = !this.newThread;  
  }

  onSubmitThread(){
    this.newThreadSuccess = false;
    this.newThreadError = false;
    const threadId = "";
    const usermail = this.auths.getLoggedUser().email;
    const type = this.threadForm.get('threadType').value;
    const description = this.threadForm.get('threadDescription').value;
    const msg = this.threadForm.get('threadMessage').value;
    const open = true;
    const message = new Message(usermail, Date.now(), msg);
    this.auths.openNewThread(type, description, message)
      .subscribe(
        (res)=>{
          this.newThreadSuccess = true;
        },
        (err)=>{
          this.newThreadError = true;
        });
    
  }
}
