import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../../../../types/appState.interface";
import {getFeedAction} from "../../store/actions/getFeed.action";
import {Observable} from "rxjs";
import {GetFeedResponseInterface} from "../../types/getFeedResponse.interface";
import {errorSelector, feedSelector, isLoadingSelector} from "../../store/selectors";
import {environment} from "../../../../../../environments/environment.development";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input("apiUrl") apiUrlProps: string

  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  feed$: Observable<GetFeedResponseInterface | null>
  limit = environment.limit
  baseUrl: string
  queryParamsSubscription
  currentPage: number

  constructor(private store: Store<AppStateInterface>, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
    this.initializeListeners()

  }

  initializeValues(): void {
    this.baseUrl = this.router.url.split('?')[0]
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.feed$ = this.store.pipe(select(feedSelector))
  }

  fetchData(): void {
    this.store.dispatch(getFeedAction({url: this.apiUrlProps}))
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || 1)
    })
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe()
  }
}
