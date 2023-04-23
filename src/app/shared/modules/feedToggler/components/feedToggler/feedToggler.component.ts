import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../../../../types/appState.interface";
import {isLoggedInSelector} from "../../../../../auth/store/selectors";

@Component({
  selector: "app-feed-toggler",
  templateUrl: "./feedToggler.component.html"
})
export class FeedTogglerComponent implements OnInit {
  @Input("tagName") tagNameProps: string | null
  isLoggedIn$: Observable<boolean>

  constructor(private store: Store<AppStateInterface>) {
  }

  ngOnInit() {
    this.initializeValues()
  }

  initializeValues() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
  }

}
