import { TestBed } from '@angular/core/testing';

import { BuildViewerService } from './build-viewer.service';

describe('BuildViewerService', () => {
  let service: BuildViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
