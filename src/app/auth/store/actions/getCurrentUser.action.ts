import { createAction, props } from '@ngrx/store';

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { ActionTypes } from 'src/app/auth/store/actionTypes';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

export const getCurrentUserAction = createAction(
    ActionTypes.GET_CURRENT_USER
);

export const getCurrentUserSuccessAction = createAction(
    ActionTypes.GET_CURRENT_USER_SUCCESS,
    props<{currentUser : CurrentUserInterface}>()
);

export const getCurrentUserFailureAction = createAction(
    ActionTypes.GET_CURRENT_USER_FAILURE
    //TODO: add props when you wish to show message later
    // props<{backendErrors : BackendErrorsInterface}>()
);