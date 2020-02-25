import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTesterComponent } from './request-tester.component';

describe('RequestTesterComponent', () => {
  let component: RequestTesterComponent;
  let fixture: ComponentFixture<RequestTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
