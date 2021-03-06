import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { UserComponent } from '../user/user.component';
import { UserRoutingModule } from '../user/user-routing.module';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { UserInitComponent } from './user-init/user-init.component';
import { UserWinesComponent } from './user-wines/user-wines.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserWineDetailComponent } from './user-wines/user-wine-detail/user-wine-detail.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserThreadsComponent } from './user-threads/user-threads.component';


@NgModule({
    declarations: [
        UserComponent,
        UserHeaderComponent,
        UserFooterComponent,
        UserInitComponent,
        UserWinesComponent,
        ShoppingCartComponent,
        UserWineDetailComponent,
        UserOrderComponent,
        UserSettingsComponent,
        UserThreadsComponent
    ],
    imports: [
        ReactiveFormsModule,
        SharedModule,
        UserRoutingModule
    ],
    exports: [],
    providers: []
})

export class UserModule { }
