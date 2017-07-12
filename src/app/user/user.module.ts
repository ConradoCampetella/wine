import { NgModule } from '@angular/core';

import { UserComponent } from "app/user/user.component";
import { UserRoutingModule } from "app/user/user-routing.module";
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { UserInitComponent } from './user-init/user-init.component';


@NgModule({
    declarations:[
        UserComponent,
        UserHeaderComponent,
        UserFooterComponent,
        UserInitComponent
    ],
    imports:[
        UserRoutingModule
    ],
    exports:[],
    providers:[]
})

export class UserModule {}