import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "app/shared/auth.service";
import { Message } from "app/shared/message.model";
import { Thread } from "app/shared/thread.model";
import { User } from "app/shared/user.model";

@Component({
  selector: 'app-user-threads',
  templateUrl: './user-threads.component.html',
  styleUrls: ['./user-threads.component.css']
})
export class UserThreadsComponent implements OnInit {
  threadForm: FormGroup;
  msgForm: FormGroup;
  threads: Thread[];
  threadDetail: Thread;
  newThread: boolean = false;
  newThreadSuccess: boolean = false;
  newThreadError: boolean = false;
  details: boolean = false;
  addMsg: boolean = false;
  user: User;

  constructor(private auths: AuthService) { }

  ngOnInit() {
    this.user = this.auths.getLoggedUser();
    this.threadForm = new FormGroup({
      'threadType': new FormControl('', Validators.required),
      'threadDescription': new FormControl('', Validators.required),
      'threadMessage': new FormControl('', Validators.required)
    });
    this.msgForm = new FormGroup({
      'msgMessage': new FormControl('', Validators.required)
    });
    this.auths.getThreads().subscribe(
      (res) => {
        this.threads = res.filter((tr) => tr.usermail == this.user.email);
      },
      (err) => {
        console.log(err);
      });
  }

  onOpenNewThread() {
    this.newThread = !this.newThread;
  }

  onSubmitThread() {
    this.newThreadSuccess = false;
    this.newThreadError = false;
    const threadId = "";
    const type = this.threadForm.get('threadType').value;
    const description = this.threadForm.get('threadDescription').value;
    const msg = this.threadForm.get('threadMessage').value;
    const open = true;
    const message = new Message(this.user.email, Date.now(), msg);
    this.auths.openNewThread(type, description, message)
      .subscribe(
      (res) => {
        this.newThreadSuccess = true;
      },
      (err) => {
        this.newThreadError = true;
      });

  }
  onDetails(idThread) {
    this.details = true;
    this.threadDetail = this.threads.find(tr => tr.idThread == idThread);
  }
  onAddMessage() {
    this.addMsg = true;
  }
  onConfimrMsg() {
    const msg = new Message(this.user.email, Date.now(), this.msgForm.get('msgMessage').value);
    this.auths.addMessageInThread(this.threadDetail.idThread, msg)
      .subscribe(
      (res) => {
        this.auths.getThreads().subscribe(
          (res) => {
            this.threads = res.filter((tr) => tr.usermail == this.user.email);
          },
          (err) => {
            console.log(err);
          });
      },
      (err) => {
        console.log(err);
      });
  }


}
