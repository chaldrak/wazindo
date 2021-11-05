import { TestBed } from '@angular/core/testing';

import { PorteurService } from './porteur.service';

describe('PorteurService', () => {
  let service: PorteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
