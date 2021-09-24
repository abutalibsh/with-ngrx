import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthService } from 'src/app/auth/service/auth.service';
import { RegisterRequestInterface } from 'src/app/auth/types/registerRequest.interface';
import { registerAction, registerFailureAction, registerSuccessAction } from '../actions/register.action';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from '../../../shared/services/persistance.service';
import { Router } from '@angular/router';

@Injectable()
export class RegisterEffect {

  //all possibly dispatched actions
  constructor(private actions$ : Actions, private service : AuthService, private persistanceService : PersistanceService, private router : Router) { }

  // register$ = createEffect(() => this.actions$.pipe(
  //   //listen on specific types of actions
  //   ofType(registerAction),
  //   //convert the action payload into another action
  //   switchMap((request) => {
  //     return this.service.register(request).pipe(
  //       //if success
  //       map((currentUser) => {return registerSuccessAction(currentUser)}),
  //       //if failed
  //       catchError(() => {return of(registerFailureAction())})
  //       );
  //     })
  //   )
  //   );

      //action<Request> --> Action<User>
      requestToAction = (request : RegisterRequestInterface) => {
        return this.service.register(request).pipe(
          //if success
          map(this.userToAction),
          //if failed
          catchError(this.catchFailure)
          );
        };
  
      userToAction = (currentUser: CurrentUserInterface) => {
        this.persistanceService.set('accessToken',currentUser.token);
        return registerSuccessAction(currentUser)
      };
  
      catchFailure = (errorResponse : HttpErrorResponse) => {return of(registerFailureAction(errorResponse.error.errors))}

    register$ = createEffect(() => this.actions$.pipe(
      //listen on specific types of actions
      ofType(registerAction),
      //convert the action payload into another action
      switchMap(this.requestToAction)
      )
      );

    redirectAfterSumbit$ = createEffect(() => this.actions$.pipe(
      ofType(registerSuccessAction),
      tap(() => {
        console.log('1');
        this.router.navigateByUrl('/');
      })
    ), {dispatch : false}
    );

}
