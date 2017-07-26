import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminThreadsSidebarComponent } from './admin-threads-sidebar.component';

describe('AdminThreadsSidebarComponent', () => {
  let component: AdminThreadsSidebarComponent;
  let fixture: ComponentFixture<AdminThreadsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminThreadsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminThreadsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
