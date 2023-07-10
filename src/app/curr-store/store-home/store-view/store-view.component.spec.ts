import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreViewComponent } from './store-view.component';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';

describe('StoreViewComponent', () => {
  let component: StoreViewComponent;
  let fixture: ComponentFixture<StoreViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreViewComponent],
      imports: [StoreModule.forRoot(), ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(StoreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
