### # Okta login in an Angular 17 application using the Authorization Code flow with PKCE.  :fa-heart:

------------
![8CBB7829-BE04-4E12-B6D0-6EF88E85BDD1](https://github.com/user-attachments/assets/15b33f0b-afb7-4fe5-ad5f-249d30a4d476)



###Create the Application in Okta
- Log into Okta: Go to Okta Developer Console and log in to your account. If you don’t have an account, create a free Okta Developer account.
1.  Create a New Application:
2.  In the Okta Developer Console, navigate to Applications > Applications.
3.  Click Create App Integration.
4.  Select OIDC - OpenID Connect as the sign-in method.
5.  Choose Single Page Application (SPA) as the application type.
6.  Click Next.
![F73E882E-A6C0-4254-9DE8-CF6C40AE087C](https://github.com/user-attachments/assets/a0ce8141-10c0-4873-92f1-6ccca69b2193)
#### Configure the Application Settings:

- App Integration Name: Name your application (e.g., "Angular SPA Login").
- Sign-in Redirect URIs: Add the URL where Okta should redirect users after login:
- http://localhost:4200/callback
- Sign-out Redirect URIs: (Optional) Add a URL to redirect users after logout:
- http://localhost:4200/login
- Assignments: Set to Everyone to allow access to all users.
- Click Save.


![9A15A1DC-5DB3-48DC-866C-10B292CA8B5A](https://github.com/user-attachments/assets/bf1989d9-e63d-4367-9b84-7ffc60aa5608)

##### Retrieve the Application Credentials:
- After saving, Okta will provide a Client ID and Issuer URL
- Note down these credentials, as they’ll be used in the Angular configuration.

###Set Up the Angular Application

```bash
ng new angular-okta-login
cd angular-okta-login
code .

```
###### Install Okta Packages: Install The Okta Sdk Packages:
```bash
npm install @okta/okta-auth-js @okta/okta-angular --save
```
######Configure Okta in Angular
```typescript

import { OktaAuthOptions } from "@okta/okta-auth-js";

export const oktaConfig: OktaAuthOptions = {
    clientId: 'xxxxxxxxxx',  
    issuer: 'https://xx-xxxxxxx.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/callback',
    scopes: ['openid', 'profile', 'email'],
    responseType: ['code'],  
    pkce: true,  
  };
```
Replace 'your-client-id' and 'https://your-domain.okta.com/oauth2/default' with the actual values from your Okta app.

###### Create the Okta Service

```javascript
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

```
- login(): Redirects the user to Okta’s login page. Once they log in, Okta will redirect them back to the application.
- logout(): Ends the session with Okta, clearing any locally stored tokens and logging the user out of your app.
- isAuthenticated(): Checks if there’s a valid authentication token available to determine if the user is currently logged in.
- handleAuthentication(): Handles the callback when Okta redirects back to the app after login. It processes the returned authentication tokens and stores them in Okta’s token manager.

##### Set Up Angular Routing
```javascript
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'callback', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  ];

```

##### Create the Login Component
```javascript
import { Component, OnInit } from '@angular/core';
import { OktaService } from '../../shared/okta.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{
  isAuthenticated = false;

  constructor(private oktaService: OktaService, private router: Router) {}
  ngOnInit(): void {
    if (window.location.pathname === '/callback') {
      this.oktaService.handleAuthentication();
    }
  }

  login() {
    this.oktaService.login();
  }

  logout() {
    this.oktaService.logout();
  }

}


```
###### Add the Login Component Template:
```javascript
<div>
  <h1>Login</h1>
  <button (click)="login()">Login with Okta</button>
  <button (click)="logout()">Logout</button>
</div>
```
:fa-star:
```javascript
ng serve 

```

------------


###### EXTRA NOTES

To allow CORS requests from http://localhost:4200 in Okta, follow these steps in the Okta Admin Console:

Log in to Okta:

Go to https://login.okta.com/ and sign in to your Okta account.
Navigate to Trusted Origins:

In the Admin panel, go to Security in the side menu.
Select API and then click on Trusted Origins.
Add a New Trusted Origin:

- Click on Add Origin to create a new origin.
- Fill in the fields as follows:
- Origin URL: Enter http://localhost:4200, which is the origin of your Angular development application.
- Type: Select both CORS and Redirect to allow redirection and CORS requests.
- Save Changes:

Click Save to save the trusted origin.
------------










