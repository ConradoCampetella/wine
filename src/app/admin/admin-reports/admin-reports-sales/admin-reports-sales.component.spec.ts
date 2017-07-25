import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportsSalesComponent } from './admin-reports-sales.component';

describe('AdminReportsSalesComponent', () => {
  let component: AdminReportsSalesComponent;
  let fixture: ComponentFixture<AdminReportsSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReportsSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReportsSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
