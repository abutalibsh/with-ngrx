import { Action, createReducer, on } from "@ngrx/store";

import { AuthStateInterface } from "src/app/auth/types/authState.interface";
import { registerAction, registerFailureAction, registerSuccessAction } from "src/app/auth/store/actions/register.action";

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
        (state, returnedUser) : AuthStateInterface => ({
            ...state,
            isSubmitting : false,
            isLoggedIn : true,
            currentUser : returnedUser            
        })),
    on(registerFailureAction,
        (state,{type,...errors}) : AuthStateInterface => ({
            ...state,
            isSubmitting : false,
            validationErrors : errors
        }))
);

export function reducers(state : AuthStateInterface, action : Action){
    return authReducer(state, action);
}