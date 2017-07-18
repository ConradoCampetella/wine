import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from "app/user/user.component";
import { UserInitComponent } from "app/user/user-init/user-init.component";
import { UserWinesComponent } from "app/user/user-wines/user-wines.component";
import { ShoppingCartComponent } from "app/user/shopping-cart/shopping-cart.component";
import { UserWineDetailComponent } from "app/user/user-wines/user-wine-detail/user-wine-detail.component";
import { UserOrderComponent } from "app/user/user-order/user-order.component";
import { UserSettingsComponent } from "app/user/user-settings/user-settings.component";
import { UserThreadsComponent } from "app/user/user-threads/user-threads.component";


const userRoutes: Routes = [
    {
        path: '', component: UserComponent, children: [
            { path: '', redirectTo: '/user/index', pathMatch: 'full' },
            { path: 'index', component: UserInitComponent },
            { path: 'wines', component: UserWinesComponent },
            { path: 'wines/:id', component: UserWineDetailComponent },
            { path: 'shoppingcart', component: ShoppingCartComponent },
            { path: 'orderhistory', component: UserOrderComponent },
            { path: 'settings', component: UserSettingsComponent },
            { path: 'threads', component: UserThreadsComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }