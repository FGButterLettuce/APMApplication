import { TestBed } from '@angular/core/testing';

import { JSService } from './js.service';

describe('JSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JSService = TestBed.get(JSService);
    expect(service).toBeTruthy();
  });
});
