import { TestBed } from '@angular/core/testing';

import { DisabledUserGuard } from './disabled-user.guard';

describe('AuthGuardGuard', () => {
  let guard: DisabledUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DisabledUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
