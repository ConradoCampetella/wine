import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportsSidebarComponent } from './admin-reports-sidebar.component';

describe('AdminReportsSidebarComponent', () => {
  let component: AdminReportsSidebarComponent;
  let fixture: ComponentFixture<AdminReportsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReportsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReportsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
