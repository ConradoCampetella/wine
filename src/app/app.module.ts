import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { WinesComponent } from './wines/wines.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { WinesService } from './shared/wines.service';
import { MapComponent } from './map/map.component';
import { ContactformComponent } from './contact/contactform/contactform.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    WinesComponent,
    AboutComponent,
    ContactComponent,
    MapComponent,
    ContactformComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC3e6U18NARu_LNFIb30O4IVZx0tVa5kjk'
    }),
    ReactiveFormsModule
  ],
  providers: [WinesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
