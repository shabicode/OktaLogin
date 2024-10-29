import { OktaAuthOptions } from "@okta/okta-auth-js";

export const oktaConfig: OktaAuthOptions = {
    clientId: '0oakn20excsRZPY2w5d7',  
    issuer: 'https://dev-87028924.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/callback',
    scopes: ['openid', 'profile', 'email'],
    responseType: ['code'],  
    pkce: true,  
  };