import {Actions, createEffect, ofType} from "@ngrx/effects";

import {catchError, map, of, switchMap, tap} from "rxjs";
import {Injectable} from "@angular/core";


import {HttpErrorResponse} from "@angular/common/http";

import {Router} from "@angular/router";

import {EditArticleService} from "../../services/editArticle.service";
import {
  updateArticleAction,
  updateArticleSuccessAction, updateArticleFailureAction
} from "../actions/updateArticle.action";
import {ArticleInterface} from "../../../shared/types/article.interface";

@Injectable()
export class UpdateArticleEffect {
  constructor(private actions$: Actions, private router: Router, private editArticleService: EditArticleService) {
  }

  updateArticle$ = createEffect(() => this.actions$.pipe(
      ofType(updateArticleAction),
      switchMap(({articleInput, slug}) => {
        return this.editArticleService.updateArticle(slug, articleInput).pipe(
          map((article: ArticleInterface) => {
            return updateArticleSuccessAction({article})
          }),
          catchError((errorResp: HttpErrorResponse) => {
            return of(updateArticleFailureAction({errors: errorResp.error.errors}))
          })
        )
      })
    )
  )
  redirectAfterUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(updateArticleSuccessAction),
    tap(({article}) => {
      this.router.navigate(["/articles", article.slug])
    })
  ), {dispatch: false})
}
