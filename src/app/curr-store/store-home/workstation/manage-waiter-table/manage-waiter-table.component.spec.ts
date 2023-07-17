import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWaiterTableComponent } from './manage-waiter-table.component';

describe('ManageWaiterTableComponent', () => {
  let component: ManageWaiterTableComponent;
  let fixture: ComponentFixture<ManageWaiterTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageWaiterTableComponent]
    });
    fixture = TestBed.createComponent(ManageWaiterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
