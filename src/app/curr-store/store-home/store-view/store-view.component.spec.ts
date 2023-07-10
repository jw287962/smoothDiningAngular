import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreViewComponent } from './store-view.component';
import { StoreModule } from '@ngrx/store';

describe('StoreViewComponent', () => {
  let component: StoreViewComponent;
  let fixture: ComponentFixture<StoreViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreViewComponent],
      imports: [StoreModule.forRoot()],
    });
    fixture = TestBed.createComponent(StoreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
