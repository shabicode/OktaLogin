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

  async ngOnInit() {
    const isCallback = window.location.pathname === '/callback';
    
    if (isCallback) {
      await this.oktaService.oktaAuth.handleRedirect();
      this.isAuthenticated = await this.oktaService.isAuthenticated();
      this.router.navigate(['/']); // Redirige a la página principal o donde desees
    } else {
      this.isAuthenticated = await this.oktaService.isAuthenticated();
    }
  }

  login() {
    this.oktaService.login();
  }

}
