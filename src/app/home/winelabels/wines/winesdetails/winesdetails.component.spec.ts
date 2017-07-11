import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinesdetailsComponent } from './winesdetails.component';

describe('WinesdetailsComponent', () => {
  let component: WinesdetailsComponent;
  let fixture: ComponentFixture<WinesdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinesdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
