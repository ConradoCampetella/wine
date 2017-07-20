import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Message } from '../../shared/message.model';
import { Thread } from '../../shared/thread.model';
import { User } from '../../shared/user.model';

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
  idThreadClicked: string;
  newThread = false;
  newThreadSuccess = false;
  newThreadError = false;
  details = false;
  addMsg = false;
  addMsgSuccess = false;
  addMsgError = false;
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
        this.threads = res.filter((tr) => tr.usermail === this.user.email);
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
    const threadId = '';
    const type = this.threadForm.get('threadType').value;
    const description = this.threadForm.get('threadDescription').value;
    const msg = this.threadForm.get('threadMessage').value;
    const open = true;
    const message = new Message(this.user.email, Date.now(), msg);
    this.auths.openNewThread(type, description, message)
      .subscribe(
      (res) => {
        this.auths.getThreads().subscribe(
          (resp) => {
            this.threads = resp.filter((tr) => tr.usermail === this.user.email);
            this.newThread = false;
          },
          (err) => {
            console.log(err);
          });
        this.newThreadSuccess = true;
      },
      (err) => {
        this.newThreadError = true;
      });

  }
  onDetails(idThread) {
    this.threadDetail = this.threads.find(tr => tr.idThread === idThread);
    if (this.idThreadClicked === idThread) {
      this.idThreadClicked = '';
      this.details = false;
    } else {
      this.idThreadClicked = idThread;
      this.details = true;
    }
  }

  onClassActive(idThread) {
    if (this.idThreadClicked === idThread) {
      return 'active';
    } else {
      return null;
    }
  }

  onClickedButton(idThread) {
    if (this.idThreadClicked === idThread) {
      return 'glyphicon glyphicon-arrow-up';
    } else {
      return 'glyphicon glyphicon-arrow-down';
    }
  }

  onAddMessage() {
    this.addMsg = !this.addMsg;
  }
  onConfimrMsg() {
    this.addMsgSuccess = false;
    this.addMsgError = false;
    const msg = new Message(this.user.email, Date.now(), this.msgForm.get('msgMessage').value);
    this.auths.addMessageInThread(this.threadDetail.idThread, msg)
      .subscribe(
      (resp) => {
        this.auths.getThreads().subscribe(
          (res) => {
            this.addMsgSuccess = true;
            this.threads = res.filter((tr) => tr.usermail === this.user.email);
            this.threadDetail = this.threads.find(tr => tr.idThread === this.idThreadClicked);
            this.addMsg = false;
          },
          (err) => {
            this.addMsgError = true;
            console.log(err);
          });
      },
      (err) => {
        this.addMsgError = true;
        console.log(err);
      });
  }

  onClose(idThread) {
    if (confirm('Are you sure you Want to close the Threads. Once close can NOT be Re-Open')) {
      this.auths.modifyThreadState(idThread, false).subscribe(
        (resp) => {
          this.auths.getThreads().subscribe(
            (res) => {
              this.threads = res.filter((tr) => tr.usermail === this.user.email);
              this.threadDetail = this.threads.find(tr => tr.idThread === this.idThreadClicked);
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
}
