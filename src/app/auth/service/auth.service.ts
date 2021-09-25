import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { environment } from '../../../environments/environment';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';

@Injectable()
export class AuthService {

  constructor(private http : HttpClient) { }

  register(data : RegisterRequestInterface) : Observable<CurrentUserInterface>{
    const url = environment.apiUrl + '/users';
    return this.http.post<AuthResponseInterface>(url,data).pipe(map((response : AuthResponseInterface) => response.user));
  }

  login(data : LoginRequestInterface) : Observable<CurrentUserInterface>{
    const url = environment.apiUrl + '/users/login';
    return this.http.post<AuthResponseInterface>(url,data).pipe(map((response : AuthResponseInterface) => response.user));
  }
}
