import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeComponent } from './cafe.component';

describe('CafeComponent', () => {
  let component: CafeComponent;
  let fixture: ComponentFixture<CafeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CafeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
