import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from '../admin/admin-routing.module';
import { AdminComponent } from '../admin/admin.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminInitComponent } from './admin-init/admin-init.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminThreadsComponent } from './admin-threads/admin-threads.component';
import { AdminReportsSidebarComponent } from './admin-reports/admin-reports-sidebar/admin-reports-sidebar.component';
import { AdminReportsSalesComponent } from './admin-reports/admin-reports-sales/admin-reports-sales.component';
import { AdminReportsStockComponent } from './admin-reports/admin-reports-stock/admin-reports-stock.component';
import { AdminReportsThreadsComponent } from './admin-reports/admin-reports-threads/admin-reports-threads.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminOrdersSidebarComponent } from './admin-orders/admin-orders-sidebar/admin-orders-sidebar.component';
import { AdminOrdersUsersComponent } from './admin-orders/admin-orders-users/admin-orders-users.component';
import { AdminOrdersCellarComponent } from './admin-orders/admin-orders-cellar/admin-orders-cellar.component';
import { AdminProductsNewComponent } from './admin-products/admin-products-new/admin-products-new.component';
import { AdminProductsSidebarComponent } from './admin-products/admin-products-sidebar/admin-products-sidebar.component';
import { AdminProductsListComponent } from './admin-products/admin-products-list/admin-products-list.component';
import { AdminUsersSidebarComponent } from './admin-users/admin-users-sidebar/admin-users-sidebar.component';
import { AdminUsersNewComponent } from './admin-users/admin-users-new/admin-users-new.component';
import { AdminUsersListComponent } from './admin-users/admin-users-list/admin-users-list.component';
import { AdminThreadsSidebarComponent } from './admin-threads/admin-threads-sidebar/admin-threads-sidebar.component';
import { AdminThreadsListComponent } from './admin-threads/admin-threads-list/admin-threads-list.component';
import { AdminThreadsNewComponent } from './admin-threads/admin-threads-new/admin-threads-new.component';



@NgModule({
    declarations: [
        AdminComponent,
        AdminHeaderComponent,
        AdminFooterComponent,
        AdminInitComponent,
        AdminReportsComponent,
        AdminProductsComponent,
        AdminUsersComponent,
        AdminThreadsComponent,
        AdminReportsSidebarComponent,
        AdminReportsSalesComponent,
        AdminReportsStockComponent,
        AdminReportsThreadsComponent,
        AdminOrdersComponent,
        AdminOrdersSidebarComponent,
        AdminOrdersUsersComponent,
        AdminOrdersCellarComponent,
        AdminProductsNewComponent,
        AdminProductsSidebarComponent,
        AdminProductsListComponent,
        AdminUsersSidebarComponent,
        AdminUsersNewComponent,
        AdminUsersListComponent,
        AdminThreadsSidebarComponent,
        AdminThreadsListComponent,
        AdminThreadsNewComponent
    ],
    imports: [
        ReactiveFormsModule,
        SharedModule,
        AdminRoutingModule
    ],
    exports: [],
    providers: []
})

export class AdminModule { }