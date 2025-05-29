import { TestBed } from '@angular/core/testing';

import { BuildAssistantService } from './build-assistant.service';

describe('BuildAssistantService', () => {
  let service: BuildAssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildAssistantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
