import { Injectable } from '@angular/core';
declare let OktaSignIn: any;

@Injectable({
  providedIn: 'root'
})
export class OktaService {
  widget: any;
  
  constructor() {
    this.widget = new OktaSignIn({
      baseUrl: 'https://dev-87028924.okta.com/oauth2/default',
      clientId: '0oakn20excsRZPY2w5d7',
      redirectUri: 'http://localhost:4200',
      authParams: {
        responseType: ['id_token', 'token']
      }
    })}

   getWidget() {
    return this.widget;
   }
}
