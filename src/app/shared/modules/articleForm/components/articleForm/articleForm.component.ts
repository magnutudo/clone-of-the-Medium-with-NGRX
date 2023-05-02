import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ArticleInputInterface} from "../../../../types/articleInput.interface";
import {BackendErrorsInterface} from "../../../../types/backendErrors.interface";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: "app-article-form",
  templateUrl: "./articleForm.component.html"
})
export class ArticleFormComponent implements OnInit {

  @Input("initialValues") InitialValuesProps: ArticleInputInterface
  @Input("isSubmitting") isSubmittingProps: boolean
  @Input("errors") errorProps: BackendErrorsInterface | null

  @Output("articleSubmit") articleSubmitEvent = new EventEmitter<ArticleInputInterface>()
  form: FormGroup

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      title: this.InitialValuesProps.title,
      description: this.InitialValuesProps.description,
      body: this.InitialValuesProps.body,
      tagList: this.InitialValuesProps.tagList.join(" ")
    })
  }

  onSubmut(): void {
    const articleInput: ArticleInputInterface = {
      ...this.form.value,
      tagList: this.form.value.tagList.split(" ")
    }
    this.articleSubmitEvent.emit(articleInput)
  }
}
