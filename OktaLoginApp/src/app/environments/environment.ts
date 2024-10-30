import { OktaAuthOptions } from "@okta/okta-auth-js";

export const oktaConfig: OktaAuthOptions = {
    clientId: 'xxxx',  
    issuer: 'https://xxxx-xxxx.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/callback',
    scopes: ['openid', 'profile', 'email'],
    responseType: ['code'],  
    pkce: true,  
  };
  