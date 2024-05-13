import { TestBed } from '@angular/core/testing';

import { AuthanticationService } from './authantication.service';

describe('AuthanticationService', () => {
  let service: AuthanticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthanticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
