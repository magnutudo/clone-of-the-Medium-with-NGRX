import {Component, Input, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppStateInterface} from "../../../../types/appState.interface";
import {addToFavoritesAction} from "../../store/actions/addToFavorites.action";

@Component({
  selector: "app-add-to-favorites",
  templateUrl: './addToFavorites.component.html'
})
export class AddToFavoritesComponent implements OnInit {
  @Input("articleSlug") articleSlugProps: string
  @Input("isFavorited") isFavoritedProps: boolean
  @Input("favoritesCount") favoritesCountProps: number
  favoritesCount: number
  isFavorited: boolean

  constructor(private store: Store<AppStateInterface>) {
  }

  handleLike() {
    this.store.dispatch(addToFavoritesAction({isFavorited: this.isFavorited, slug: this.articleSlugProps}))
    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1
    } else {
      this.favoritesCount = this.favoritesCount + 1
    }
    this.isFavorited = !this.isFavorited

  }

  ngOnInit(): void {
    this.favoritesCount = this.favoritesCountProps
    this.isFavorited = this.isFavoritedProps
  }
}
