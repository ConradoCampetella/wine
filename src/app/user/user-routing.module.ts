import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from "app/user/user.component";
import { UserInitComponent } from "app/user/user-init/user-init.component";
import { UserWinesComponent } from "app/user/user-wines/user-wines.component";
import { ShoppingCartComponent } from "app/user/shopping-cart/shopping-cart.component";
import { UserWineDetailComponent } from "app/user/user-wines/user-wine-detail/user-wine-detail.component";


const userRoutes: Routes = [
    {
        path: '', component: UserComponent, children: [
            { path: '', redirectTo: '/user/index', pathMatch: 'full' },
            { path: 'index', component: UserInitComponent },
            { path: 'wines', component: UserWinesComponent },
            { path: 'wines/:id', component: UserWineDetailComponent },
            { path: 'shoppingcart', component: ShoppingCartComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }