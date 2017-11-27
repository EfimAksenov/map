import { TestBed, inject } from '@angular/core/testing';

import { RoutesDaoService } from './routes-dao.service';

describe('RoutesDaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutesDaoService]
    });
  });

  it('should be created', inject([RoutesDaoService], (service: RoutesDaoService) => {
    expect(service).toBeTruthy();
  }));
});
