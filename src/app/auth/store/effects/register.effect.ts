import {Actions, createEffect, ofType} from "@ngrx/effects";
import {registerAction, registerFailureAction, registerSuccessAction} from "../actions/register.action";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {PersistanceService} from "../../../shared/services/persistance.service";
import {Router} from "@angular/router";

@Injectable()
export class RegisterEffect {
  constructor(private actions$: Actions, private router: Router, private authService: AuthService, private persistanceService: PersistanceService) {
  }

  register$ = createEffect(() => this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {

            this.persistanceService.set("access-token", currentUser.token)
            return registerSuccessAction({currentUser})
          }),
          catchError((errorResp: HttpErrorResponse) => {
            return of(registerFailureAction({errors: errorResp.error.errors}))
          })
        )
      })
    )
  )
  redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
    ofType(registerSuccessAction),
    tap(() => {
      this.router.navigate(["/"])
    })
  ), {dispatch: false})
}
