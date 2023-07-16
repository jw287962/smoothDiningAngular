import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyDataComponent } from './party-data.component';

describe('PartyDataComponent', () => {
  let component: PartyDataComponent;
  let fixture: ComponentFixture<PartyDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyDataComponent]
    });
    fixture = TestBed.createComponent(PartyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
