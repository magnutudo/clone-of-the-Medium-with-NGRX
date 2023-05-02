import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CreateArticleComponent} from "./components/createArticle/createArticle.component";
import {RouterModule, Routes} from "@angular/router";
import {ArticleFormModule} from "../shared/modules/articleForm/articleForm.module";
import {EditArticleService} from "./services/editArticle.service";
import {EffectsModule} from "@ngrx/effects";
import {UpdateArticleEffect} from "./store/effects/updateArticle.effect";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {ArticleService} from "../shared/services/article.service";
import {GetArticleEffect} from "./store/effects/getArticle.effect";

const routes: Routes = [
  {
    path: "articles/new",
    component: CreateArticleComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ArticleFormModule, EffectsModule.forFeature([UpdateArticleEffect,GetArticleEffect]), StoreModule.forFeature("editArticle", reducers)],
  declarations: [CreateArticleComponent],
  providers: [EditArticleService,ArticleService]
})
export class EditArticleModule {

}
