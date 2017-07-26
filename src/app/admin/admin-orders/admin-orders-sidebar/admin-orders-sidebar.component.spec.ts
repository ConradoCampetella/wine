import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersSidebarComponent } from './admin-orders-sidebar.component';

describe('AdminOrdersSidebarComponent', () => {
  let component: AdminOrdersSidebarComponent;
  let fixture: ComponentFixture<AdminOrdersSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
