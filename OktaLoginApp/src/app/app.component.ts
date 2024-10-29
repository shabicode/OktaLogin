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

  constructor(private okta: OktaService) {
    
  }
}
