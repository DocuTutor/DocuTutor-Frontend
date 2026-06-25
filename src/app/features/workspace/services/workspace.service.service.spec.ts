/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Workspace.serviceService } from './workspace.service.service';

describe('Service: Workspace.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Workspace.serviceService]
    });
  });

  it('should ...', inject([Workspace.serviceService], (service: Workspace.serviceService) => {
    expect(service).toBeTruthy();
  }));
});
