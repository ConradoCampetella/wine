import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appPagBut]'
})
export class PaginationButtonDirective {
  @HostBinding('class.btn-default') isDefault = true;
  @HostBinding('class.btn-success') isSuccess = false;

  @HostListener('click') toggleOpen() {
    this.isDefault = !this.isDefault;
    this.isSuccess = !this.isSuccess;
  }
}
