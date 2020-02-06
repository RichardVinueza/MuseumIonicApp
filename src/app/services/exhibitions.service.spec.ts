import { TestBed } from '@angular/core/testing';

import { ExhibitionsService } from './exhibitions.service';

describe('ExhibitionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExhibitionsService = TestBed.get(ExhibitionsService);
    expect(service).toBeTruthy();
  });
});
