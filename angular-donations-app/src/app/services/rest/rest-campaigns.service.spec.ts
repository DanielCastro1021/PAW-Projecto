import { TestBed } from '@angular/core/testing';

import { RestCampaignsService } from './rest-campaigns.service';

describe('RestCampaignsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestCampaignsService = TestBed.get(RestCampaignsService);
    expect(service).toBeTruthy();
  });
});
