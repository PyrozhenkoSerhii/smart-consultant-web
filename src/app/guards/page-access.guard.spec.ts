import { TestBed, async, inject } from '@angular/core/testing';

import { PageAccessGuard } from './page-access.guard';

describe('PageAccessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageAccessGuard]
    });
  });

  it('should ...', inject([PageAccessGuard], (guard: PageAccessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
