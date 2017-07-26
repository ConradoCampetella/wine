import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsSidebarComponent } from './admin-products-sidebar.component';

describe('AdminProductsSidebarComponent', () => {
  let component: AdminProductsSidebarComponent;
  let fixture: ComponentFixture<AdminProductsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
