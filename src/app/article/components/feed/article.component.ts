import {Component, OnDestroy, OnInit} from "@angular/core";
import {AppStateInterface} from "../../../shared/types/appState.interface";
import {select, Store} from "@ngrx/store";
import {getArticleAction} from "../../store/actions/getArticle.action";
import {ActivatedRoute} from "@angular/router";
import {ArticleInterface} from "../../../shared/types/article.interface";
import {combineLatest, map, Observable, Subscription} from "rxjs";
import {articleSelector, errorSelector, isLoadingSelector} from "../../store/selectors";
import {currentUserSelector} from "../../../auth/store/selectors";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {deleteArticleAction} from "../../store/actions/deleteArticle.action";


@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.scss"]
})
export class ArticleComponent implements OnInit, OnDestroy {
  article: ArticleInterface | null
  articleSubscription: Subscription
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  isAuthor$: Observable<boolean>

  constructor(private store: Store<AppStateInterface>, private route: ActivatedRoute) {
  }

  slug: string

  ngOnInit() {
    this.fetchData()
    this.initializeValues()
    this.initializeListeners()
  }


  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isAuthor$ = combineLatest(
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector))
    ).pipe(map(([article, currentUser]: [ArticleInterface | null, CurrentUserInterface | null]) => {
      if (!article || !currentUser) {
        return false
      }
      return currentUser.username === article.author.username
    }))
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }

  initializeListeners(): void {
    this.articleSubscription = this.store.pipe(select(articleSelector)).subscribe((article: ArticleInterface | null) => {
      this.article = article
    })
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe()
  }

  deleteArticle():void {
    this.store.dispatch(deleteArticleAction({slug: this.slug}))

  }
}
