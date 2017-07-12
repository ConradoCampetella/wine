import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from "app/shared/dropdown.directive";
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationButtonDirective } from "app/shared/paginationButton.directive";


@NgModule({
  declarations: [
    DropdownDirective,
    PaginationButtonDirective
  ],
  imports: [],
  exports: [
    DropdownDirective,
    PaginationButtonDirective,
    CommonModule,
    NgxPaginationModule
  ]
})
export class SharedModule { }