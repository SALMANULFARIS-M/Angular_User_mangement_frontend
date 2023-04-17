import { TestBed } from '@angular/core/testing';

import { BackendService } from './backend.service';

describe('BackendServicesService', () => {
  let service: BackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
