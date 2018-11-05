import { TestBed } from '@angular/core/testing';

import { TtsService } from './tts.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TtsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
  }));

  it('should be created', () => {
    const service: TtsService = TestBed.get(TtsService);
    expect(service).toBeTruthy();
  });
});
