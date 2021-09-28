import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { environment } from '../../../environments/environment';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { AuthStateInterface } from '../types/authState.interface';
import { PersistanceService } from 'src/app/shared/services/persistance.service';

@Injectable()
export class AuthService {

  constructor(private http : HttpClient, private service : PersistanceService) { }

  getUser(response : AuthResponseInterface) : CurrentUserInterface{
    return response.user;
  }

  register(data : RegisterRequestInterface) : Observable<CurrentUserInterface>{
    const url = environment.apiUrl + '/users';
    return this.http.post<AuthResponseInterface>(url,data).pipe(map(this.getUser));
  }

  login(data : LoginRequestInterface) : Observable<CurrentUserInterface>{
    const url = environment.apiUrl + '/users/login';
    return this.http.post<AuthResponseInterface>(url,data).pipe(map(this.getUser));
  }

  getCurrentUser() : Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user';
    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }
}
