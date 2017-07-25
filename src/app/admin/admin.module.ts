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
        AdminReportsThreadsComponent
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