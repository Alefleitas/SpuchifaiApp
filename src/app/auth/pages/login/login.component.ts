import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../interfaces/auth.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  form!: FormGroup
  minLengthForName: number = 5;

  user: Auth = {
    usuario: '',
    contraseña: ''
  }

  constructor(
    private router: Router,
    private _authService: AuthService,
    private snackBar: MatSnackBar,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // console.log(this.activatedRoute.params);

    this.form = this.fb.group({
      usuario: [this.user.usuario, [Validators.required]],
      contraseña: [this.user.contraseña, [Validators.required]]
    });


  }


  login(form: FormGroup): void {
    this.user.usuario = this.form.get('usuario')?.value;
    this.user.contraseña = this.form.get('contraseña')?.value;
    
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
