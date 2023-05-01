import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { createFeatureSelector } from "@ngrx/store";
import { User } from "../models/intefaces"


export const userRootSelector = (state: AppState) => state.allUser;

export const selectUser = createSelector(
    userRootSelector,(allUser:User[])=>{
        return[...allUser]
    }
)
