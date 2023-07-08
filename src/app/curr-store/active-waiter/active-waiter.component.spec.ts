import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveWaiterComponent } from './active-waiter.component';

describe('ActiveWaiterComponent', () => {
  let component: ActiveWaiterComponent;
  let fixture: ComponentFixture<ActiveWaiterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveWaiterComponent]
    });
    fixture = TestBed.createComponent(ActiveWaiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
