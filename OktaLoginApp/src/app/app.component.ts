import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OktaService } from './shared/okta.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app works!';
  user: string | null = null;

  oktaSignIn: any;

  constructor(private okta: OktaService) {
    
  }

  showLogin() {
    this.oktaSignIn.renderEl({el: '#okta-login-container'}, (response: any) => {
      console.log('response', response);
      if (response.status === 'SUCCESS') {
        this.oktaSignIn.tokenManager.add('authToken', response[1]);
        this.user = response[0].claims.email;
      }
    });
  }

  ngOnInit() {
    this.oktaSignIn = this.okta.getWidget();
    this.oktaSignIn.session.get((response: any) => {
      if (response.status !== 'INACTIVE') {
        this.user = response.login
      } else {
        this.showLogin();
      }
    });
  }

  logout() {
    this.oktaSignIn.signOut(() => {
      this.showLogin();
      this.user = null;
    });
  }
}
