import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserThreadsComponent } from './user-threads.component';

describe('UserThreadsComponent', () => {
  let component: UserThreadsComponent;
  let fixture: ComponentFixture<UserThreadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserThreadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
