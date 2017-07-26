import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminThreadsListComponent } from './admin-threads-list.component';

describe('AdminThreadsListComponent', () => {
  let component: AdminThreadsListComponent;
  let fixture: ComponentFixture<AdminThreadsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminThreadsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminThreadsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
