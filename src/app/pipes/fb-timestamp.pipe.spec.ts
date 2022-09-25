import { DatePipe } from '@angular/common';
import { FbTimestampPipe } from './fb-timestamp.pipe';

describe('FbTimestampPipe', () => {
  let datePipeService: DatePipe;

  it('create an instance', () => {
    const pipe = new FbTimestampPipe(datePipeService);
    expect(pipe).toBeTruthy();
  });
});
