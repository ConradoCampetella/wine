import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './shared/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/home/index', pathMatch: 'full'},
  {path: 'home', loadChildren: './home/home.module#HomeModule'},
  {path: 'user', loadChildren: './user/user.module#UserModule', canActivate: [AuthGuard] },
  {path: 'admin', component: AdminComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
