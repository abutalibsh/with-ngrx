import { Action, createReducer, on } from "@ngrx/store";

import { AuthStateInterface } from "src/app/auth/types/authState.interface";
import { registerAction } from "src/app/auth/store/actions";


const initialiState : AuthStateInterface = {
    isSubmitting : false
};

const authReducer = createReducer(
    initialiState,
    on(registerAction,
        (state) : AuthStateInterface => ({
            ...state,
            isSubmitting : true
        }))
);

export function reducers(state : AuthStateInterface, action : Action){
    return authReducer(state, action);
}