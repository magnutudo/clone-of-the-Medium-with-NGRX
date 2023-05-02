import {Actions, createEffect, ofType} from "@ngrx/effects";

import {catchError, map, of, switchMap, tap} from "rxjs";
import {Injectable} from "@angular/core";


import {ArticleService} from "../../services/article.service";
import {
  deleteArticleAction,
  deleteArticleFailureAction,
  deleteArticleSuccessAction
} from "../actions/deleteArticle.action";
import {Router} from "@angular/router";

@Injectable()
export class DeleteArticleEffect {
  constructor(private actions$: Actions, private router: Router, private articleService: ArticleService) {
  }

  deleteArticle$ = createEffect(() => this.actions$.pipe(
      ofType(deleteArticleAction),
      switchMap(({slug}) => {
        return this.articleService.deleteArticle(slug).pipe(
          map(() => {
            return deleteArticleSuccessAction()
          }),
          catchError(() => {
            return of(deleteArticleFailureAction)
          })
        )
      })
    )
  )
  redirectAfterDelete$ = createEffect(() => this.actions$.pipe(
    ofType(deleteArticleSuccessAction),
    tap(() => {
      this.router.navigate(['/'])
    })
  ), {dispatch: false})

}
