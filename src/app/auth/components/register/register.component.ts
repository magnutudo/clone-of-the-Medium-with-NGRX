import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {registerAction} from "../../store/actions/register.action";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup

  constructor(private fb: FormBuilder, private store:Store) {
  }

  ngOnInit() {
    this.initializeForm()
  }
  initializeForm():void{
    this.form = this.fb.group({
      username:["",Validators.required],
      email:["",Validators.email],
      password:["",Validators.minLength(8)]
    })
  }

  onSubmit() {
    console.log(this.form.value)
    this.store.dispatch(registerAction(this.form.value))
    this.form.reset()
  }
}
