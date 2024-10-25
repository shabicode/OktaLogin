import { TestBed } from '@angular/core/testing';

import { OktaService } from './okta.service';

describe('OktaService', () => {
  let service: OktaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
