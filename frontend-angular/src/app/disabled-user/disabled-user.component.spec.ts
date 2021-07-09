import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledUserComponent } from './disabled-user.component';

describe('DisabledUserComponent', () => {
  let component: DisabledUserComponent;
  let fixture: ComponentFixture<DisabledUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisabledUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabledUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
