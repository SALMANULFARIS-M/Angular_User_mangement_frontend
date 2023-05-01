import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, tap, switchMap } from "rxjs/operators";
import { BackendService } from "../../services/backend.service";
import { FetchUserAPI, invokeUserAPI } from "src/app/store/user.actions";


@Injectable()

export class userEffect {
    constructor(private actions$: Actions, private backendService: BackendService) { }

    loadAllBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeUserAPI),
            switchMap(() => {
                return this.backendService.getUser().pipe(
                    tap((data) => console.log(data, "this is data")),
                    map((data) => FetchUserAPI({ allUser: data })
                    )
                )
            })
        )
    )
}
