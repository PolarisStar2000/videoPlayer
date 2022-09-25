import { DomSanitizer } from '@angular/platform-browser';
import { SafeURLPipe } from './safe-url.pipe';

describe('SafeURLPipe', () => {
  let sanitizerService: DomSanitizer;

  it('create an instance', () => {
    const pipe = new SafeURLPipe(sanitizerService);
    expect(pipe).toBeTruthy();
  });
});
