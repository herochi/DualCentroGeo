import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyAfc6F6NNNslbpa_mmOKjTqRGeQRPEVQgY';

  userToken = '';
  correoUser = '';

  // Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Ingresar
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]



  constructor(private http: HttpClient) { }

  login( usuario: UsuarioModel ){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${ this.url }signInWithPassword?key=${ this.apiKey }`, authData).pipe(
      map(resp => {
        // tslint:disable-next-line: no-string-literal
        this.guardarToken(resp['idToken']);
        // tslint:disable-next-line: no-string-literal
        this.guardarCorreo(resp['email']);
        return resp;
      })
    );

  }

  private guardarToken( idToken: string ){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    const hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  private guardarCorreo( correo: string ){
    this.correoUser = correo;
    localStorage.setItem('correo', correo);
  }

  leerToken(){
    if ( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {

    if (this.userToken.length < 2){
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()){
      return true;
    }else{
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
      }
}
