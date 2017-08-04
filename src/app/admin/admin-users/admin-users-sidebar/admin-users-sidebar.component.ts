import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-admin-users-sidebar',
  templateUrl: './admin-users-sidebar.component.html',
  styleUrls: ['./admin-users-sidebar.component.css']
})
export class AdminUsersSidebarComponent implements OnInit {
  userRoute: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.subscribe(
      (url: any) => {
        this.userRoute = url.url;
      });
  }


  newUser() {
    if (this.userRoute === '/admin/users/new' || this.userRoute === '/admin/users/list' || this.userRoute === '/admin/users' || !this.userRoute) {
      return false;
    } else {
      return true;
    }
  }

}
