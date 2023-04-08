import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {registerAction} from "../../store/actions/register.action";
import {Observable} from "rxjs";
import {isSubmittingSelector} from "../../store/selectors";
import {AppStateInterface} from "../../../shared/types/appState.interface";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>


  constructor(private fb: FormBuilder, private store: Store<AppStateInterface>) {
  }

  ngOnInit() {
    this.initializeForm()
    this.initializeValues()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ["", Validators.required],
      email: ["", Validators.email],
      password: ["", Validators.minLength(8)]
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    console.log(this.form.value)
    this.store.dispatch(registerAction(this.form.value))
    this.form.reset()
  }

  initializeValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    console.log("isSubmitting", this.isSubmitting$)
  }
}
