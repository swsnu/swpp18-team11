import { TestBed } from '@angular/core/testing';

import { TtsService } from './tts.service';
import { HttpClient } from '@angular/common/http';

describe('TtsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TtsService = TestBed.get(TtsService);
    expect(service).toBeTruthy();
  });
});
