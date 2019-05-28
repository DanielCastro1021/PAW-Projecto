import { TestBed } from '@angular/core/testing';

import { RestDonationsService } from './rest-donations.service';

describe('RestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestDonationsService = TestBed.get(RestDonationsService);
    expect(service).toBeTruthy();
  });
});
