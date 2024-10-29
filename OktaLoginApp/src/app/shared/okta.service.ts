import { Injectable } from '@angular/core';
import OktaAuth from '@okta/okta-auth-js';
import { oktaConfig } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OktaService {
  public oktaAuth = new OktaAuth(oktaConfig);

  login() {
    return this.oktaAuth.signInWithRedirect();
  }

  logout() {
    return this.oktaAuth.signOut();
  }

  async isAuthenticated(): Promise<boolean> {
    return !!(await this.oktaAuth.tokenManager.get('idToken'));
  }
}

