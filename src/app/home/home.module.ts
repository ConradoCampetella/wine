import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AboutComponent } from "app/home/about/about.component";
import { ContactComponent } from "app/home/contact/contact.component";
import { FooterComponent } from "app/home/footer/footer.component";
import { HeaderComponent } from "app/home/header/header.component";
import { HomecontentComponent } from "app/home/homecontent/homecontent.component";
import { MapComponent } from "app/home/map/map.component";
import { WinesComponent } from "app/home/wines/wines.component";
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactformComponent } from "app/home/contact/contactform/contactform.component";
import { HomeComponent } from "app/home/home.component";

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { HomeRoutingModule } from './home-routing.module';

import { WinesService } from '../shared/wines.service';



@NgModule({
    declarations: [
        AboutComponent,
        ContactComponent,
        ContactformComponent,
        FooterComponent,
        HeaderComponent,
        HomecontentComponent,
        MapComponent,
        WinesComponent,
        SigninComponent,
        SignupComponent,
        HomeComponent
    ],
    imports: [
        ReactiveFormsModule,
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyC3e6U18NARu_LNFIb30O4IVZx0tVa5kjk'
        }),
        HomeRoutingModule
    ],
    exports: [],
    providers: [WinesService]
})
export class HomeModule { }