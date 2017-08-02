import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';
import { Message } from '../../../shared/message.model';
import { Thread } from '../../../shared/thread.model';
import { User } from '../../../shared/user.model';

@Component({
  selector: 'app-admin-threads-list',
  templateUrl: './admin-threads-list.component.html',
  styleUrls: ['./admin-threads-list.component.css']
})
export class AdminThreadsListComponent implements OnInit {
  threads: Thread[];
  threadDetail: Thread;
  idThreadClicked: string;
  details = false;
  spinnerVisible = true;
  user: User;
  adminMsgForm: FormGroup;
  addMsg = false;
  addMsgSuccess = false;
  addMsgError = false;
  addMsgSpinner = false;

  constructor(private auths: AuthService) { }

  ngOnInit() {
    this.user = this.auths.getLoggedUser();
    this.auths.getThreads().subscribe(
      res => {
        this.threads = res;
        this.spinnerVisible = false;
      },
      err => {
        console.log(err);
        this.spinnerVisible = false;
      });
    this.adminMsgForm = new FormGroup({
      'adminMsgMessage': new FormControl('', Validators.required)
    });
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

  onAddMessage() {
    this.addMsg = !this.addMsg;
  }

  onConfimrMsg() {
    this.addMsgSuccess = false;
    this.addMsgError = false;
    this.addMsgSpinner = true;
    const msg = new Message(this.user.email, Date.now(), this.adminMsgForm.get('adminMsgMessage').value);
    this.auths.addMessageInThread(this.threadDetail.idThread, msg)
      .subscribe(
      (resp) => {
        this.auths.getThreads().subscribe(
          (res) => {
            this.addMsgSpinner = false;
            this.addMsgSuccess = true;
            this.threads = res;
            this.threadDetail = this.threads.find(tr => tr.idThread === this.idThreadClicked);
            this.addMsg = false;
          },
          (err) => {
            this.addMsgSpinner = false;
            this.addMsgError = true;
          });
      },
      (err) => {
        this.addMsgSpinner = false;
        this.addMsgError = true;
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
