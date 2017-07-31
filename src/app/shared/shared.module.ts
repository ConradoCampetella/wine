import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from '../shared/dropdown.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderButtonDirective } from '../shared/orderButton.directive';
import { SpinnerComponent } from './spinner/spinner.component';
import { LittleSpinnerComponent } from './little-spinner/little-spinner.component';



@NgModule({
  declarations: [
    DropdownDirective,
    OrderButtonDirective,
    SpinnerComponent,
    LittleSpinnerComponent
  ],
  imports: [],
  exports: [
    DropdownDirective,
    OrderButtonDirective,
    SpinnerComponent,
    LittleSpinnerComponent,
    CommonModule,
    NgxPaginationModule
  ]
})
export class SharedModule { }
