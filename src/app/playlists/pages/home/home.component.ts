import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`.container{
    margin:10px;
  }
  `]
})
export class HomeComponent {

  get auth():Auth {
    return this._authService.auth;
  }
  constructor(
    private router: Router,
    private _authService: AuthService
  ) { }

  logout() {
    localStorage.removeItem('Auth');
    this.router.navigate(['./auth'])
  }
}
