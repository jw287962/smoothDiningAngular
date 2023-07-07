import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { LoginApiService } from 'src/store/service/login.service';

import { Injectable } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

@Injectable()
export class MockLoginApiService {
  // Implement mock methods and properties as needed
  fetchStores() {
    return this.manageError();
  }
  manageError() {
    return [];
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LoginApiService, useClass: MockLoginApiService }],
      declarations: [HomeComponent],
      imports: [StoreModule.forRoot({})],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ', () => {
    expect(component).toBeTruthy();
  });
});
