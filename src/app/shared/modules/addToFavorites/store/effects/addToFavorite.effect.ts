import {Actions, createEffect, ofType} from "@ngrx/effects";

import {catchError, map, of, switchMap} from "rxjs";
import {Injectable} from "@angular/core";
import {AddToFavoritesService} from "../../services/addToFavorites.service";
import {
  addToFavoritesAction,
  addToFavoritesFailureAction,
  addToFavoritesSuccessAction
} from "../actions/addToFavorites.action";
import {ArticleInterface} from "../../../../types/article.interface";

@Injectable()
export class AddToFavoritesEffect {
  constructor(private actions$: Actions, private addToFavoritesService: AddToFavoritesService) {
  }

  addToFavorites$ = createEffect(() => this.actions$.pipe(
      ofType(addToFavoritesAction),
      switchMap(({isFavorited, slug}) => {
        const article$ = isFavorited ? this.addToFavoritesService.removeFromFavorites(slug) : this.addToFavoritesService.addToFavorites(slug)
        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesSuccessAction({article})
          }),
          catchError(() => {
            return of(addToFavoritesFailureAction)
          })
        )
      })
    )
  )
}
