import {Actions, createEffect, ofType} from "@ngrx/effects";

import {catchError, map, of, switchMap, tap} from "rxjs";
import {Injectable} from "@angular/core";


import {HttpErrorResponse} from "@angular/common/http";

import {Router} from "@angular/router";

import {CreateArticleService} from "../../services/createArticle.service";
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction
} from "../actions/createArticle.action";
import {ArticleInterface} from "../../../shared/types/article.interface";

@Injectable()
export class CreateArticleEffect {
  constructor(private actions$: Actions, private router: Router, private createService: CreateArticleService) {
  }

  createArticle$ = createEffect(() => this.actions$.pipe(
      ofType(createArticleAction),
      switchMap(({articleInput}) => {
        return this.createService.createArticle(articleInput).pipe(
          map((article: ArticleInterface) => {
            return createArticleSuccessAction({article})
          }),
          catchError((errorResp: HttpErrorResponse) => {
            return of(createArticleFailureAction({errors: errorResp.error.errors}))
          })
        )
      })
    )
  )
  redirectAfterCreate$ = createEffect(() => this.actions$.pipe(
    ofType(createArticleSuccessAction),
    tap(({article}) => {
      this.router.navigate(["/article", article.slug])
    })
  ), {dispatch: false})
}
