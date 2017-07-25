import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportsThreadsComponent } from './admin-reports-threads.component';

describe('AdminReportsThreadsComponent', () => {
  let component: AdminReportsThreadsComponent;
  let fixture: ComponentFixture<AdminReportsThreadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReportsThreadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReportsThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
