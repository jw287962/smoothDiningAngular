import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreHomeComponent } from './store-home.component';
import { StoreModule } from '@ngrx/store';
import { CurrStoreRoutingModule } from '../curr-store-routing.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('StoreHomeComponent', () => {
  let component: StoreHomeComponent;
  let fixture: ComponentFixture<StoreHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreHomeComponent],
      imports: [StoreModule.forRoot(), AppRoutingModule],
    });
    fixture = TestBed.createComponent(StoreHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
