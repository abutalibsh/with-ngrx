import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/auth/types/appState.inteface";
import { FeedStateInterface } from "../types/feedState.interface";

export const feedFeatureSelector = createFeatureSelector<AppStateInterface, FeedStateInterface>('feed');
// export const authFeatureSelector = createFeatureSelector<AuthStateInterface>('auth')

export const isLoadingSelector = createSelector(
    feedFeatureSelector,
    (feedState: FeedStateInterface) => feedState.isLoading
  )

export const errorsSelector = createSelector(
    feedFeatureSelector,
    (feedState : FeedStateInterface) => feedState.error
)

export const dataSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.data
)
