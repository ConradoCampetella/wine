import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { AuthService } from "app/shared/auth.service";
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    HomeModule,
    UserModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
