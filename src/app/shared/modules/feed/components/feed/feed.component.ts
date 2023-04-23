import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../../../../types/appState.interface";
import {getFeedAction} from "../../store/actions/getFeed.action";
import {Observable} from "rxjs";
import {GetFeedResponseInterface} from "../../types/getFeedResponse.interface";
import {errorSelector, feedSelector, isLoadingSelector} from "../../store/selectors";
import {environment} from "../../../../../../environments/environment.development";
import {ActivatedRoute, Params, Router} from "@angular/router";
import queryString from 'query-string';

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
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
    this.initializeListeners()

  }

  initializeValues(): void {
    this.baseUrl = this.router.url.split('?')[0]
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.feed$ = this.store.pipe(select(feedSelector))
  }

  fetchFeed(): void {
    let offset = this.currentPage * this.limit - this.limit // 3*10 = 30 - 10 = 20
    console.log(this.apiUrlProps)
    const parsedUrl = queryString.parseUrl(this.apiUrlProps)
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query
    })
    console.log("string:", stringifiedParams)
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
    this.store.dispatch(getFeedAction({url: apiUrlWithParams}))
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || 1)
      this.fetchFeed()
    })
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged = !changes['apiUrlProps'].firstChange && changes['apiUrlProps'].currentValue !== changes['apiUrlProps'].previousValue
    if (isApiUrlChanged) {
      this.fetchFeed()
    }
  }
}
