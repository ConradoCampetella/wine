import { NgModule } from '@angular/core';

import { SharedModule } from "app/shared/shared.module";
import { UserComponent } from "app/user/user.component";
import { UserRoutingModule } from "app/user/user-routing.module";
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { UserInitComponent } from './user-init/user-init.component';
import { UserWinesComponent } from './user-wines/user-wines.component';


@NgModule({
    declarations:[
        UserComponent,
        UserHeaderComponent,
        UserFooterComponent,
        UserInitComponent,
        UserWinesComponent
    ],
    imports:[
        SharedModule,
        UserRoutingModule
    ],
    exports:[],
    providers:[]
})

export class UserModule {}