import {Actions, createEffect, ofType} from "@ngrx/effects";
import {registerAction, registerFailureAction, registerSuccessAction} from "../actions/register.action";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {PersistanceService} from "../../../shared/services/persistance.service";
import {Router} from "@angular/router";
import {loginAction, loginFailureAction, loginSuccessAction} from "../actions/login.action";

@Injectable()
export class LoginEffect {
  constructor(private actions$: Actions, private router: Router, private authService: AuthService, private persistanceService: PersistanceService) {
  }

  login$ = createEffect(() => this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set("access-token", currentUser.token)
            return loginSuccessAction({currentUser})
          }),
          catchError((errorResp: HttpErrorResponse) => {
            return of(loginFailureAction({errors: errorResp.error.errors}))
          })
        )
      })
    )
  )
  redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccessAction),
    tap(() => {
      this.router.navigate(["/"])
    })
  ), {dispatch: false})
}
