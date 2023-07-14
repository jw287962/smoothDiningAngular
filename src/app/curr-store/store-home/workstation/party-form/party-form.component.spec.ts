import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyFormComponent } from './party-form.component';

describe('PartyFormComponent', () => {
  let component: PartyFormComponent;
  let fixture: ComponentFixture<PartyFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyFormComponent]
    });
    fixture = TestBed.createComponent(PartyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
