import {Component, OnInit} from "@angular/core";
import {AppStateInterface} from "../../../../types/appState.interface";
import {select, Store} from "@ngrx/store";
import {getFeedAction} from "../../../feed/store/actions/getFeed.action";
import {getPopularTagsAction} from "../../store/actions/getPopularTags.action";
import {Observable} from "rxjs";
import {PopularTagType} from "../../../../types/popularTag.type";
import {errorSelector, isLoadingSelector, popularTagsSelector} from "../../store/selectors";

@Component({
  selector: "app-popular-tags",
  templateUrl: "./popularTags.component.html"
})
export class PopularTagsComponent implements OnInit {
  popularTags$: Observable<PopularTagType[] | null>
  isLoading$: Observable<boolean>
  error$: Observable<string | null>

  constructor(private store: Store<AppStateInterface>) {
  }

  ngOnInit() {
    this.initializeValues()
    this.fetchData()
  }

  fetchData() {
    this.store.dispatch(getPopularTagsAction())
  }

  initializeValues() {
    this.popularTags$ = this.store.pipe(select(popularTagsSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))

  }
}
