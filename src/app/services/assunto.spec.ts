import { TestBed } from '@angular/core/testing';

import { Assunto } from './assunto';

describe('Assunto', () => {
  let service: Assunto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Assunto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
