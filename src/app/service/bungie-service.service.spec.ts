import { TestBed } from '@angular/core/testing';

import { BungieService } from './bungie-service.service';

describe('BungieServiceService', () => {
  let service: BungieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BungieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
