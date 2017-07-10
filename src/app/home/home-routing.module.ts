import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { HomecontentComponent } from "app/home/homecontent/homecontent.component";
import { WinelabelsComponent } from "app/home/winelabels/winelabels.component";

const homeRoutes: Routes = [
    {
        path: '', component: HomeComponent, children: [
            {path: '', redirectTo: '/home/index', pathMatch: 'full'},
            { path: 'index', component: HomecontentComponent },
            { path: 'labels', component: WinelabelsComponent },
            { path: 'about', component: AboutComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'newuser', component: SignupComponent },
            { path: 'login', component: SigninComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class HomeRoutingModule { }