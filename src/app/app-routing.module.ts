import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home/index', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'user', loadChildren: './user/user.module#UserModule', canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
