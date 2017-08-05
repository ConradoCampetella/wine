import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersNewComponent } from './admin-orders-new.component';

describe('AdminOrdersNewComponent', () => {
  let component: AdminOrdersNewComponent;
  let fixture: ComponentFixture<AdminOrdersNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
