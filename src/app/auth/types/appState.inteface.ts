import { FeedStateInterface } from "../../shared/modules/feed/types/feedState.interface";
import { AuthStateInterface } from "./authState.interface";

export interface AppStateInterface{
    auth : AuthStateInterface
    feed : FeedStateInterface
}