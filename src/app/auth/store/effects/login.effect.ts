import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthService } from 'src/app/auth/service/auth.service';
import { loginAction, loginFailureAction, loginSuccessAction} from 'src/app/auth/store/actions/login.action';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginEffect {

  //all possibly dispatched actions
  constructor(private actions$ : Actions, private service : AuthService, private persistanceService : PersistanceService, private router : Router) { }

    successLoginToAction = (currentUser: CurrentUserInterface) => {
        this.persistanceService.set(environment.accessToken,currentUser.token);
        return loginSuccessAction({currentUser})
      };  

    catchLoginFailure = (errorResponse : HttpErrorResponse) => {return of(loginFailureAction({backendErrors : errorResponse.error.errors}))}

    //action<LoginRequest> --> Action<CurrentUser>
    loginRequestToAction = ({request}) => {
      return this.service.login(request).pipe(
        //if success
        map(this.successLoginToAction),
        //if failed
        catchError(this.catchLoginFailure)
        );
      };

/**
 * Effects
 */

    login$ = createEffect(() => this.actions$.pipe(
      //listen on specific types of actions
      ofType(loginAction),
      //convert the action payload into another action
      switchMap(this.loginRequestToAction)
      )
      );

    redirectAfterLogin$ = createEffect(() => this.actions$.pipe(
      ofType(loginSuccessAction),
      tap(() => {
        console.log('1');
        this.router.navigateByUrl('/');
      })
    ), {dispatch : false}
    );

}
