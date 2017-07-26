import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from '../admin/admin.component';
import { AdminInitComponent } from '../admin/admin-init/admin-init.component';

import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { AdminReportsSalesComponent } from './admin-reports/admin-reports-sales/admin-reports-sales.component';
import { AdminReportsStockComponent } from './admin-reports/admin-reports-stock/admin-reports-stock.component';
import { AdminReportsThreadsComponent } from './admin-reports/admin-reports-threads/admin-reports-threads.component';

import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminUsersListComponent } from '../admin/admin-users/admin-users-list/admin-users-list.component';
import { AdminUsersNewComponent } from '../admin/admin-users/admin-users-new/admin-users-new.component';

import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminProductsListComponent } from '../admin/admin-products/admin-products-list/admin-products-list.component';
import { AdminProductsNewComponent } from '../admin/admin-products/admin-products-new/admin-products-new.component';

import { AdminOrdersComponent } from '../admin/admin-orders/admin-orders.component';
import { AdminOrdersCellarComponent } from '../admin/admin-orders/admin-orders-cellar/admin-orders-cellar.component';
import { AdminOrdersUsersComponent } from '../admin/admin-orders/admin-orders-users/admin-orders-users.component';

import { AdminThreadsComponent } from './admin-threads/admin-threads.component';
import { AdminThreadsListComponent } from '../admin/admin-threads/admin-threads-list/admin-threads-list.component';
import { AdminThreadsNewComponent } from '../admin/admin-threads/admin-threads-new/admin-threads-new.component';


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
            {
                path: 'products', component: AdminProductsComponent, children: [
                    { path: '', redirectTo: '/admin/products/list', pathMatch: 'full' },
                    { path: 'list', component: AdminProductsListComponent },
                    { path: 'new', component: AdminProductsNewComponent }
                ]
            },
            {
                path: 'users', component: AdminUsersComponent, children: [
                    { path: '', redirectTo: '/admin/users/list', pathMatch: 'full' },
                    { path: 'list', component: AdminUsersListComponent },
                    { path: 'new', component: AdminUsersNewComponent }
                ]
            },
            {
                path: 'threads', component: AdminThreadsComponent, children: [
                    { path: '', redirectTo: '/admin/threads/list', pathMatch: 'full' },
                    { path: 'list', component: AdminThreadsListComponent },
                    { path: 'new', component: AdminThreadsNewComponent }
                ]
            },
            {
                path: 'orders', component: AdminOrdersComponent, children: [
                    { path: '', redirectTo: '/admin/orders/users', pathMatch: 'full' },
                    { path: 'users', component: AdminOrdersUsersComponent },
                    { path: 'cellar', component: AdminOrdersCellarComponent }
                ]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }
