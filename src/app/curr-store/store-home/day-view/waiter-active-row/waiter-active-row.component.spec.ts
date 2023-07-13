import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterActiveRowComponent } from './waiter-active-row.component';

describe('WaiterActiveRowComponent', () => {
  let component: WaiterActiveRowComponent;
  let fixture: ComponentFixture<WaiterActiveRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaiterActiveRowComponent],
    });
    fixture = TestBed.createComponent(WaiterActiveRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
