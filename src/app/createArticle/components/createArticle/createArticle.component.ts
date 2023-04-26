import {Component, Input} from "@angular/core";
import {ArticleInterface} from "../../../shared/types/article.interface";
import {ArticleInputInterface} from "../../../shared/types/articleInput.interface";
import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";

@Component({
  selector: "app-create-article",
  templateUrl: "./createArticle.component.html"
})
export class CreateArticleComponent {
  @Input("initialValues") InitialValuesProps: ArticleInputInterface
  @Input("isSubmitting") isSubmittingProps: boolean
  @Input("errors") errorProps: BackendErrorsInterface | null

}
