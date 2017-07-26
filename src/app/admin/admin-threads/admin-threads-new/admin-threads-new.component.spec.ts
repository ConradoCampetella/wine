import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminThreadsNewComponent } from './admin-threads-new.component';

describe('AdminThreadsNewComponent', () => {
  let component: AdminThreadsNewComponent;
  let fixture: ComponentFixture<AdminThreadsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminThreadsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminThreadsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
