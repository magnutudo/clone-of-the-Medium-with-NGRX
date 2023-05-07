import {Component, OnInit} from "@angular/core";
import {ArticleInputInterface} from "../../../shared/types/articleInput.interface";
import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../../../shared/types/appState.interface";
import {isSubmittingSelector, validationErrorsSelector} from "../../store/selectors";
import {createArticleAction} from "../../store/actions/createArticle.action";

@Component({
  selector: "app-create-article",
  templateUrl: "./createArticle.component.html"
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    title: "",
    description: "",
    body: "",
    tagList: []
  }
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(private store: Store<AppStateInterface>) {
  }

  onSubmit(res: ArticleInputInterface) {
    this.store.dispatch(createArticleAction({articleInput: res}))
  }

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))

  }
}
