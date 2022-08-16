import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, Observable, of, tap } from 'rxjs';
import { Controller } from 'src/app/enum/controller.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl: string = 'http://api.spuchifai.novit.com.ar/api/v2'
  public _auth: Auth | undefined;
  constructor(
    private httpClient: HttpClient,

  ) { }


  get auth(): Auth {
    return { ...this._auth! }
  }

  verifyAuthentication(): Observable<boolean> { // | boolean no necesita el of
    let auth: Auth = JSON.parse(localStorage.getItem('Auth')!);
    console.log('vacio?', auth);

    if (auth == null || !auth.token) {
      return of(false); //Of genera un observable mediante un argumento que se le pase
    }

    return this.httpClient.post(`${this.baseApiUrl}/${Controller.Account}/Login`, auth, {
      responseType: 'text'
    })
      .pipe(
        map(token => {
          this._auth = auth;
          this._auth.token = token;
          return true;
        })
      )

  }


  postLogin(auth: Auth): Observable<any> {
    return this.httpClient.post(`${this.baseApiUrl}/${Controller.Account}/Login`, auth, {
      responseType: 'text'
    }).pipe(
      tap(resp => {
        
        // tap, antes de dirigirse al metodo que lo invoca, realiza la logica en el tap
        this._auth = auth;
        this._auth.token = resp;

      }),
      tap(resp => localStorage.setItem('Auth', JSON.stringify(this._auth)))
    )
  }

}
