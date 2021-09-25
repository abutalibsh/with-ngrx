import { Action, createReducer, on } from "@ngrx/store";

import { AuthStateInterface } from "src/app/auth/types/authState.interface";
import { loginAction, loginFailureAction, loginSuccessAction, registerAction, registerFailureAction, registerSuccessAction } from "src/app/auth/store/actions/register.action";

const initialiState : AuthStateInterface = {
    isSubmitting : false,
    currentUser : null,
    isLoggedIn : null,
    validationErrors : null,
};

const authReducer = createReducer(
    initialiState,
    on(registerAction,
        (state) : AuthStateInterface => ({
            ...state,
            isSubmitting : true,
            validationErrors : null
        })),
    on(registerSuccessAction,
        (state, action) : AuthStateInterface => ({
            ...state,
            isSubmitting : false,
            isLoggedIn : true,
            currentUser : action.currentUser
        })),
    on(registerFailureAction,
        (state,action) : AuthStateInterface => ({
            ...state,
            isSubmitting : false,
            validationErrors : action.backendErrors
        })),
    on(loginAction,
        (state) : AuthStateInterface => ({
            ...state,
            isSubmitting : true,
            validationErrors : null
        })),
    on(loginSuccessAction,
        (state,action) : AuthStateInterface => ({
            ...state,
            isSubmitting : false,
            isLoggedIn : true,
            currentUser : action.currentUser
        })),
    on(loginFailureAction,
        (state,action) : AuthStateInterface => ({
            ...state,
            isSubmitting : false,
            validationErrors : action.backendErrors
        }))
);

export function reducers(state : AuthStateInterface, action : Action){
    return authReducer(state, action);
}