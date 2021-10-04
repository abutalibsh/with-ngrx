import { Action, createReducer, on } from "@ngrx/store";

import { AuthStateInterface } from "src/app/auth/types/authState.interface";
import { registerAction, registerFailureAction, registerSuccessAction } from "src/app/auth/store/actions/register.action";
import { loginAction, loginFailureAction, loginSuccessAction} from 'src/app/auth/store/actions/login.action';
import { getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction } from "./actions/getCurrentUser.action";

const initialState : AuthStateInterface = {
    isSubmitting : false,
    isLoading : false,
    currentUser : null,
    isLoggedIn : null,
    validationErrors : null,
};

const authReducer = createReducer(
    initialState,
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
        })),
    on(getCurrentUserAction,
        (state) : AuthStateInterface => ({
            ...state,
            isLoading : true
        })),
    on(getCurrentUserSuccessAction,
        (state,action) : AuthStateInterface => ({
            ...state,
            isLoading : false,
            isLoggedIn : true,
            currentUser : action.currentUser        
        })),
    on(getCurrentUserFailureAction,
        (state,action) : AuthStateInterface => ({
            ...state,
            isLoading : false,
            isLoggedIn : false,
            currentUser : null
        }))
);

export function reducers(state : AuthStateInterface, action : Action){
    return authReducer(state, action);
}