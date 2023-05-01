import { createAction, props } from "@ngrx/store";
import { User } from "../models/intefaces"



export const invokeUserAPI = createAction(
    '[user API] Invoke API'
)

export const FetchUserAPI = createAction(
    '[user API] fetch api success',
    props<{allUser:User[]}>()
)

