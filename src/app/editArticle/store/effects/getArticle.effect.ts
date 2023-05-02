import {Actions, createEffect, ofType} from "@ngrx/effects";

import {catchError, map, of, switchMap} from "rxjs";
import {Injectable} from "@angular/core";


import {ArticleInterface} from "../../../shared/types/article.interface";
import {ArticleService} from "../../../shared/services/article.service";
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from "../actions/getArticle.action";

@Injectable()
export class GetArticleEffect {
  constructor(private actions$: Actions, private articleService: ArticleService) {
  }

  getArticle$ = createEffect(() => this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({slug}) => {
        return this.articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return getArticleSuccessAction({article})
          }),
          catchError(() => {
            return of(getArticleFailureAction())
          })
        )
      })
    )
  )

}
