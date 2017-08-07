import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/auth.service';
import { User } from '../../../shared/user.model';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css']
})
export class AdminUsersListComponent implements OnInit {
  allUsers: User[];
  spinnerVisible = true;

  constructor(private auths: AuthService, private router: Router) { }

  ngOnInit() {
    this.auths.getAllUsers().subscribe(
      (res) => {
        this.allUsers = this.auths.allUsers;
        this.spinnerVisible = false;
      },
      (err) => {
        console.log(err);
        this.spinnerVisible = false;
      }
    );
  }
  onModify(usermail) {
    this.router.navigate(['/admin/users/edit', usermail]);
  }

  onDelete(usermail) {
    if (confirm('Are you sure you want to delete this user')) {
      const delUser = this.allUsers.find(user => user.email === usermail);
      this.auths.deleteteUser(delUser).subscribe(
        (res: string) => {
          if (res === 'Orders Exists') {
            alert('You can´t Delete Users that have Orders in the site');
          } else {
            this.auths.getAllUsers().subscribe(
              () => {
                this.allUsers = this.auths.allUsers;
              },
              (err) => {
                console.log(err);
              }
            );
          }
        },
        (err) => {
          alert('Something went wrong, please try again later');
        }
      );
    }

  }

}
