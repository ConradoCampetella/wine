import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from "app/shared/dropdown.directive";
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderButtonDirective } from "app/shared/orderButton.directive";


@NgModule({
  declarations: [
    DropdownDirective,
    OrderButtonDirective
  ],
  imports: [],
  exports: [
    DropdownDirective,
    OrderButtonDirective,
    CommonModule,
    NgxPaginationModule
  ]
})
export class SharedModule { }