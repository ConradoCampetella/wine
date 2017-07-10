import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinelabelsComponent } from './winelabels.component';

describe('WinelabelsComponent', () => {
  let component: WinelabelsComponent;
  let fixture: ComponentFixture<WinelabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinelabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinelabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
