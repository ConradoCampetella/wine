import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersNewComponent } from './admin-users-new.component';

describe('AdminUsersNewComponent', () => {
  let component: AdminUsersNewComponent;
  let fixture: ComponentFixture<AdminUsersNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
