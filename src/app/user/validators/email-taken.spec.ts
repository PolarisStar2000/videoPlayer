import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EmailTaken } from './email-taken';

describe('EmailTaken', () => {
  let authService: AngularFireAuth;

  it('should create an instance', () => {
    expect(new EmailTaken(authService)).toBeTruthy();
  });
});
