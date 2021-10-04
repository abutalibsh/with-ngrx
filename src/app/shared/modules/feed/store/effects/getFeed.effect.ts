import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, switchMap} from 'rxjs/operators';

import { FeedService } from '../../services/feed.service';
import { getFeedAction, getFeedFailureAction, getFeedSuccessAction } from '../actions/getFeed.action';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';

@Injectable()
export class GetFeedEffect {

  //all possibly dispatched actions
  constructor(private actions$ : Actions, private service : FeedService) { }

    successFeedToAction = (feed: GetFeedResponseInterface) => {        
        return getFeedSuccessAction({feed});
      };  

    catchGetFeedFailure = (errorResponse : HttpErrorResponse) => {
      return of(getFeedFailureAction())
      // return of(getFeedFailureAction({backendErrors : errorResponse.error.errors}))
    }

    //action<GetFeedRequest> --> Action<GetFeed>
    getFeedRequestToAction = () => {
      return this.service.getFeed('/articles').pipe(
        //if success
        map(this.successFeedToAction),
        //if failed
        catchError(this.catchGetFeedFailure)
        );      
      };

/**
 * Effects
 */

    getFeed$ = createEffect(() => this.actions$.pipe(
      //listen on specific types of actions
      ofType(getFeedAction),
      //convert the action payload into another action
      switchMap(this.getFeedRequestToAction)
      )
      );

}
