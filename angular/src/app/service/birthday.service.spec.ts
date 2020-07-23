import { TestBed } from '@angular/core/testing';

import { BirthdayService } from './birthday.service';

describe('BirthdayService', () => {
  let service: BirthdayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirthdayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
