import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FeedComponent} from "./components/feed/feed.component";
import {EffectsModule} from "@ngrx/effects";
import {GetArticleEffect} from "./store/effects/getArticle.effect";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {ArticleService} from "../shared/services/article.service";
import {RouterModule} from "@angular/router";
import {ErrorMessageModule} from "../shared/modules/errorMessage/errorMessage.module";
import {TagListModule} from "../shared/modules/tagList/tagList.module";
import {LoadingModule} from "../shared/modules/loading/loading.module";
import {PaginationModule} from "../shared/modules/pagination/pagination.module";


@NgModule({
  imports: [CommonModule, EffectsModule.forFeature(GetArticleEffect), StoreModule.forFeature("feed", reducers), RouterModule, ErrorMessageModule, LoadingModule, PaginationModule, TagListModule],
  declarations: [FeedComponent],
  exports: [FeedComponent],
  providers: [ArticleService]
})
export class ArticleModule {

}
