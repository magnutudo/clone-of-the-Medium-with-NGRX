import {Actions, createEffect, ofType} from "@ngrx/effects";

import {catchError, map, of, switchMap} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";

import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction
} from "../actions/getCurrentsUser.action";
import {PersistanceService} from "../../../shared/services/persistance.service";

@Injectable()
export class GetCurrentUserEffect {
  constructor(private actions$: Actions, private authService: AuthService, private persistanceService: PersistanceService) {
  }

  getCurrentUser$ = createEffect(() => this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistanceService.get("access-token")
        if (!token) {
          return of(getCurrentUserFailureAction)
        }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return getCurrentUserSuccessAction({currentUser})
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction)
          })
        )
      })
    ), {dispatch: false}
  )

}
