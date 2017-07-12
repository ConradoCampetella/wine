import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from "app/user/user.component";
import { UserInitComponent } from "app/user/user-init/user-init.component";
import { UserWinesComponent } from "app/user/user-wines/user-wines.component";


const userRoutes: Routes = [
    {
        path: '', component: UserComponent, children: [
            { path: '', redirectTo: '/user/index', pathMatch: 'full' },
            { path: 'index', component: UserInitComponent },
            { path: 'wines', component: UserWinesComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }