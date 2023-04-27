import {Component, Input} from "@angular/core";
import {ArticleInterface} from "../../../shared/types/article.interface";
import {ArticleInputInterface} from "../../../shared/types/articleInput.interface";
import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";

@Component({
  selector: "app-create-article",
  templateUrl: "./createArticle.component.html"
})
export class CreateArticleComponent {
  initialValues = {
    title: "foo",
    description: "boo",
    body: "BABA",
    tagList: ["213", '3213']
  }

  onSubmit(res: ArticleInputInterface) {
    console.log("OnSubmit", res)
  }
}
