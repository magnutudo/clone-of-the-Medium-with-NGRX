import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CreateArticleComponent} from "./components/createArticle/createArticle.component";
import {RouterModule, Routes} from "@angular/router";
import {ArticleFormModule} from "../shared/modules/articleForm/articleForm.module";

const routes: Routes = [
  {
    path: "articles/new",
    component: CreateArticleComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ArticleFormModule],
  declarations: [CreateArticleComponent]
})
export class CreateArticleModule {

}
