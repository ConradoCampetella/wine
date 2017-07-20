import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AboutComponent } from '../home/about/about.component';
import { ContactComponent } from '../home/contact/contact.component';
import { FooterComponent } from '../home/footer/footer.component';
import { HeaderComponent } from '../home/header/header.component';
import { HomecontentComponent } from '../home/homecontent/homecontent.component';
import { MapComponent } from '../home/map/map.component';
import { WinesComponent } from '../home/winelabels/wines/wines.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactformComponent } from '../home/contact/contactform/contactform.component';
import { HomeComponent } from '../home/home.component';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { HomeRoutingModule } from './home-routing.module';

import { WinesService } from '../shared/wines.service';
import { WinesdetailsComponent } from './winelabels/wines/winesdetails/winesdetails.component';
import { WinelabelsComponent } from './winelabels/winelabels.component';



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
        HomeComponent,
        WinesdetailsComponent,
        WinelabelsComponent
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
    providers: []
})
export class HomeModule { }
