import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeURL'
})
export class SafeURLPipe implements PipeTransform {

  transform(value: string) {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
  constructor(private sanitizer: DomSanitizer) { }
}
