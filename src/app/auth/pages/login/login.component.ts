import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../interfaces/auth.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  password: string = '';

  user: Auth = {
    usuario: '',
    contraseña: ''
  }

  constructor(
    private router: Router,
    private _authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  login() {
    console.log(this._authService.postLogin(this.user));

    this.user.contraseña = this.password;
    this._authService.postLogin(this.user)
      .subscribe(resp => {
        console.log(resp);
        this.router.navigate(['./playlist'])

      }
      )
  }


  showSnackbar(message: string) {
    this.snackBar.open(message, 'ok!', {
      duration: 5000
    });

  }
}
