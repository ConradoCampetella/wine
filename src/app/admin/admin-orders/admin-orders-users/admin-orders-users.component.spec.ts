import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersUsersComponent } from './admin-orders-users.component';

describe('AdminOrdersUsersComponent', () => {
  let component: AdminOrdersUsersComponent;
  let fixture: ComponentFixture<AdminOrdersUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
