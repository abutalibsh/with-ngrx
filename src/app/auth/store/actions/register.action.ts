import { createAction, props } from '@ngrx/store';

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { RegisterRequestInterface } from 'src/app/auth/types/registerRequest.interface';
import { ActionTypes } from 'src/app/auth/store/actionTypes';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { LoginRequestInterface } from '../../types/loginRequest.interface';

export const registerAction = createAction(
    ActionTypes.REGISTER,
  props<{request : RegisterRequestInterface}>()
);

export const registerSuccessAction = createAction(
    ActionTypes.REGISTER_SUCCESS,
    props<{currentUser : CurrentUserInterface}>()
);

export const registerFailureAction = createAction(
    ActionTypes.REGISTER_FAILURE,
    props<{backendErrors : BackendErrorsInterface}>()
);

export const loginAction = createAction(
    ActionTypes.LOGIN,
    props<{request : LoginRequestInterface}>()
);

export const loginSuccessAction = createAction(
    ActionTypes.LOGIN_SUCCESS,
    props<{currentUser : CurrentUserInterface}>()
);

export const loginFailureAction = createAction(
    ActionTypes.LOGIN_FAILURE,
    props<{backendErrors : BackendErrorsInterface}>()
);