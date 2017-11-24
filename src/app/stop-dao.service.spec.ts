import { TestBed, inject } from '@angular/core/testing';

import { StopDaoService } from './stop-dao.service';

describe('StopDaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StopDaoService]
    });
  });

  it('should be created', inject([StopDaoService], (service: StopDaoService) => {
    expect(service).toBeTruthy();
  }));
});
