import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-products-sidebar',
  templateUrl: './admin-products-sidebar.component.html',
  styleUrls: ['./admin-products-sidebar.component.css']
})
export class AdminProductsSidebarComponent implements OnInit {
  userRoute: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.subscribe(
      (url: any) => {
        this.userRoute = url.url;
      });
  }

  newProducts() {
    if (this.userRoute === '/admin/products/new' ||
      this.userRoute === '/admin/products/list' ||
      this.userRoute === '/admin/products' ||
      !this.userRoute) {
      return false;
    } else {
      return true;
    }
  }

}
