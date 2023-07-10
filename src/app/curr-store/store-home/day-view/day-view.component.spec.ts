import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayViewComponent } from './day-view.component';
import { StoreApiService } from 'src/store/service/store.service';
import { StoreModule } from '@ngrx/store';
import { WaiterActiveRowComponent } from './waiter-active-row/waiter-active-row.component';

describe('DayViewComponent', () => {
  let component: DayViewComponent;
  let fixture: ComponentFixture<DayViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayViewComponent, WaiterActiveRowComponent],
      imports: [StoreModule.forRoot()],
    });
    fixture = TestBed.createComponent(DayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
