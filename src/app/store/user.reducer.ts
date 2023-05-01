import { createReducer, on, StoreModule } from "@ngrx/store";
import { User } from "../models/intefaces";
import { FetchUserAPI } from "./user.actions";

export const initialState: User[] = []

const _UserReducer = createReducer(
    initialState,
    on(FetchUserAPI, (state, { allUser }) => {
        return [...allUser]
    })
)

export function UserReducer(state: any, action: any) {
    return _UserReducer(state,action)
}

