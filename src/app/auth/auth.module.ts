import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {RegisterComponent} from './components/register/register.component';
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from "@angular/common/http";




const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent
  }
]

@NgModule({
  imports: [CommonModule,HttpClientModule, RouterModule.forChild(routes), ReactiveFormsModule, StoreModule.forFeature("auth", reducers)],
  declarations: [
    RegisterComponent
  ],
  providers:[AuthService]
})
export class AuthModule {

}
