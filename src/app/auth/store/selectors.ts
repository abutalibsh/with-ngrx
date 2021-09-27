import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/auth/types/appState.inteface";
import { AuthStateInterface } from "src/app/auth/types/authState.interface";

export const authFeatureSelector = createFeatureSelector<AppStateInterface, AuthStateInterface>('auth');
// export const authFeatureSelector = createFeatureSelector<AuthStateInterface>('auth')

export const isSubmittingSelector = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.isSubmitting
  )

export const validationErrorsSelector = createSelector(
    authFeatureSelector,
    (authState : AuthStateInterface) => authState.validationErrors
)

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn
)

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState : AuthStateInterface) => authState.currentUser
)