import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthService } from 'src/app/auth/service/auth.service';
import { loginAction, loginFailureAction, loginSuccessAction, registerAction, registerFailureAction, registerSuccessAction } from 'src/app/auth/store/actions/register.action';
import { PersistanceService } from 'src/app/shared/services/persistance.service';

@Injectable()
export class RegisterEffect {

  //all possibly dispatched actions
  constructor(private actions$ : Actions, private service : AuthService, private persistanceService : PersistanceService, private router : Router) { }

  /**
   * Register
   */
  
  successRegisterToAction = (currentUser: CurrentUserInterface) => {
    this.persistanceService.set('accessToken',currentUser.token);
    return registerSuccessAction({currentUser})
  };
  
  catchRegisterFailure = (errorResponse : HttpErrorResponse) => {return of(registerFailureAction({backendErrors : errorResponse.error.errors}))}
  
  //action<RegisterRequest> --> Action<CurrentUser>
  registerRequestToAction = ({request}) => {
      return this.service.register(request).pipe(
        //if success
        map(this.successRegisterToAction),
        //if failed
        catchError(this.catchRegisterFailure)
        );
      };

  /**
   * Login
   */

    successLoginToAction = (currentUser: CurrentUserInterface) => {
        this.persistanceService.set('accessToken',currentUser.token);
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

  /**
   * Register
   */

    register$ = createEffect(() => this.actions$.pipe(
      //listen on specific types of actions
      ofType(registerAction),
      //convert the action payload into another action
      switchMap(this.registerRequestToAction)
      )
      );

    redirectAfterRegister$ = createEffect(() => this.actions$.pipe(
      ofType(registerSuccessAction),
      tap(() => {
        console.log('1');
        this.router.navigateByUrl('/');
      })
    ), {dispatch : false}
    );

  /**
   * Login
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
