import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportsContentComponent } from './admin-reports-content.component';

describe('AdminReportsContentComponent', () => {
  let component: AdminReportsContentComponent;
  let fixture: ComponentFixture<AdminReportsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReportsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReportsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
