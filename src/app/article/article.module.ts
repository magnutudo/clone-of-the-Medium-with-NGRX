import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {EffectsModule} from "@ngrx/effects";
import {GetArticleEffect} from "./store/effects/getArticle.effect";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {ArticleService as SharedArticleService} from "../shared/services/article.service";
import {RouterModule, Routes} from "@angular/router";
import {ErrorMessageModule} from "../shared/modules/errorMessage/errorMessage.module";

import {LoadingModule} from "../shared/modules/loading/loading.module";
import {ArticleComponent} from "./components/feed/article.component";
import {TagListModule} from "../shared/modules/tagList/tagList.module";

const routes:Routes = [
  {
    path:"articles/:slug",
    component:ArticleComponent
  }
]
@NgModule({
  imports: [CommonModule, EffectsModule.forFeature(GetArticleEffect), StoreModule.forFeature("article", reducers), RouterModule.forChild(routes), ErrorMessageModule, LoadingModule, TagListModule],
  declarations: [ArticleComponent],
  exports: [],
  providers: [SharedArticleService]
})
export class ArticleModule {

}
