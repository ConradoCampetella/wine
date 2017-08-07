import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/auth.service';
import { Message } from '../../../shared/message.model';
import { User } from '../../../shared/user.model';

@Component({
  selector: 'app-admin-threads-new',
  templateUrl: './admin-threads-new.component.html',
  styleUrls: ['./admin-threads-new.component.css']
})
export class AdminThreadsNewComponent implements OnInit {
  users: User[];
  adminThreadForm: FormGroup;
  newThreadSpinner = false;
  newThreadSuccess = false;
  newThreadError = false;
  loggedUser: User;
  spinnerVisible = true;


  constructor(private auths: AuthService, private router: Router) { }

  ngOnInit() {
    this.loggedUser = this.auths.getLoggedUser();
    this.adminThreadForm = new FormGroup({
      'adminThreadUser': new FormControl('', Validators.required),
      'adminThreadType': new FormControl('', Validators.required),
      'adminThreadDescription': new FormControl('', Validators.required),
      'adminThreadMessage': new FormControl('', Validators.required)
    });
    this.auths.getAllUsers().subscribe(
      (res) => {
        this.users = this.auths.allUsers;
        this.spinnerVisible = false;
      },
      (err) => {
        console.log(err);
        this.spinnerVisible = false;
      });
  }
  onSubmitThread() {
    this.newThreadSuccess = false;
    this.newThreadError = false;
    this.newThreadSpinner = true;
    const threadId = '';
    const email = this.adminThreadForm.get('adminThreadUser').value;
    const type = this.adminThreadForm.get('adminThreadType').value;
    const description = this.adminThreadForm.get('adminThreadDescription').value;
    const msg = this.adminThreadForm.get('adminThreadMessage').value;
    const open = true;
    const message = new Message(this.loggedUser.email, Date.now(), msg);
    this.auths.openNewThread(type, description, message)
      .subscribe(
      (res) => {
        this.newThreadSpinner = false;
        this.newThreadSuccess = true;
        this.router.navigate(['/admin/threads/list']);
      },
      (err) => {
        this.newThreadSpinner = false;
        this.newThreadError = true;
      });
  }
}
