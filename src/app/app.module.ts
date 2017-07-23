import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { AuthService } from './shared/auth.service';
import { AdminComponent } from './admin/admin.component';
import { WinesService } from './shared/wines.service';
import { AuthGuard } from './shared/auth-guard.service';


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
  providers: [
    AuthService,
    WinesService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
