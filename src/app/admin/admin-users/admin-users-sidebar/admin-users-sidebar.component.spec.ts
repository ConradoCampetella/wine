import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersSidebarComponent } from './admin-users-sidebar.component';

describe('AdminUsersSidebarComponent', () => {
  let component: AdminUsersSidebarComponent;
  let fixture: ComponentFixture<AdminUsersSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
