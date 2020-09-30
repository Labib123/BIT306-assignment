import { TestBed } from '@angular/core/testing';

import { TestKService } from './testkit.service';

describe('TestService', () => {
  let service: TestKService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestKService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
