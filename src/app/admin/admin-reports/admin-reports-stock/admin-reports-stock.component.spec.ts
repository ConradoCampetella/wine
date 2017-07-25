import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportsStockComponent } from './admin-reports-stock.component';

describe('AdminReportsStockComponent', () => {
  let component: AdminReportsStockComponent;
  let fixture: ComponentFixture<AdminReportsStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReportsStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReportsStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
