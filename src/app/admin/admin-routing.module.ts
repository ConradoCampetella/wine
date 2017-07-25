import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from '../admin/admin.component';
import { AdminInitComponent } from '../admin/admin-init/admin-init.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminThreadsComponent } from './admin-threads/admin-threads.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { AdminReportsSalesComponent } from './admin-reports/admin-reports-sales/admin-reports-sales.component';
import { AdminReportsStockComponent } from './admin-reports/admin-reports-stock/admin-reports-stock.component';
import { AdminReportsThreadsComponent } from './admin-reports/admin-reports-threads/admin-reports-threads.component';


const adminRoutes: Routes = [
    {
        path: '', component: AdminComponent, children: [
            { path: '', redirectTo: '/admin/index', pathMatch: 'full' },
            { path: 'index', component: AdminInitComponent },
            {
                path: 'reports', component: AdminReportsComponent, children: [
                    { path: '', redirectTo: '/admin/reports/sales', pathMatch: 'full' },
                    { path: 'sales', component: AdminReportsSalesComponent },
                    { path: 'stock', component: AdminReportsStockComponent },
                    { path: 'threads', component: AdminReportsThreadsComponent }
                ]
            },
            { path: 'products', component: AdminProductsComponent },
            { path: 'users', component: AdminUsersComponent },
            { path: 'threads', component: AdminThreadsComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }
