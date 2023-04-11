import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {isSubmittingSelector, validationErrorsSelector} from "../../store/selectors";
import {AppStateInterface} from "../../../shared/types/appState.interface";

import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";
import {loginAction} from "../../store/actions/login.action";
import {LoginRequestInterface} from "../../types/loginRequest.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store<AppStateInterface>) {
  }

  ngOnInit() {
    this.initializeForm()
    this.initializeValues()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: "",
      password: ""
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    console.log(this.form.value)



    const request:LoginRequestInterface={
      user:this.form.value

    }
    this.store.dispatch(loginAction({request}))

    this.form.reset()
  }

  initializeValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
    console.log("isSubmitting", this.isSubmitting$)

  }
}
