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
