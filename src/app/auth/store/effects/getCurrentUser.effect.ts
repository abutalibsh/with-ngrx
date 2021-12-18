import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthService } from 'src/app/auth/service/auth.service';
import { getCurrentUserAction,getCurrentUserSuccessAction,getCurrentUserFailureAction} from 'src/app/auth/store/actions/getCurrentUser.action';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class GetCurrentUserEffect {

  //all possibly dispatched actions
  constructor(private actions$ : Actions, private service : AuthService, private persistanceService : PersistanceService) { }

    successLoginToAction = (currentUser: CurrentUserInterface) => {        
        return getCurrentUserSuccessAction({currentUser})
      };  

    catchGetCurrentUserFailure = (errorResponse : HttpErrorResponse) => {
      return of(getCurrentUserFailureAction())
      // return of(getCurrentUserFailureAction({backendErrors : errorResponse.error.errors}))
    }

    //action<GetCurrentUserRequest> --> Action<CurrentUser>
    getCurrentUserRequestToAction = () => {
      if (!this.persistanceService.get(environment.accessToken)){
        return of(getCurrentUserFailureAction());
      } 
      return this.service.getCurrentUser().pipe(
        //if success
        map(this.successLoginToAction),
        //if failed
        catchError(this.catchGetCurrentUserFailure)
        );      
      };

/**
 * Effects
 */

    getCurrentUser$ = createEffect(() => this.actions$.pipe(
      //listen on specific types of actions
      ofType(getCurrentUserAction),
      //convert the action payload into another action
      switchMap(this.getCurrentUserRequestToAction)
      )
      );

    // redirectAfterFailure$ = createEffect(() => this.actions$.pipe(
    //   ofType(getCurrentUserSuccessAction),
    //   tap(() => {
    //     console.log('1');
    //     this.router.navigateByUrl('/');
    //   })
    // ), {dispatch : false}
    // );

}
