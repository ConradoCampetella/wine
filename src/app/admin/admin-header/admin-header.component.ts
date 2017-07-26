import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  isIn = false;

  constructor(private auths: AuthService, private router: Router) { }

  ngOnInit() {
  }

  changeInClass() {
    this.isIn = !this.isIn;
  }
  onLogOut() {
    this.auths.logout();
    this.router.navigate(['/home']);
  }
}
