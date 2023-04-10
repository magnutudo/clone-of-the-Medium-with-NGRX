import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {RegisterComponent} from './components/register/register.component';
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {EffectsModule} from "@ngrx/effects";
import {RegisterEffect} from "./store/effects/register.effect";
import {BackendErrorMessagesModule} from "../shared/modules/backendErrorMessages/backendErrorMessages.module";
import {PersistanceService} from "../shared/services/persistance.service";





const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent
  }
]

@NgModule({

  imports: [CommonModule,HttpClientModule, RouterModule.forChild(routes), ReactiveFormsModule, StoreModule.forFeature("auth", reducers), EffectsModule.forFeature([RegisterEffect]), BackendErrorMessagesModule],

  declarations: [
    RegisterComponent
  ],
  providers:[AuthService,PersistanceService]
})
export class AuthModule {

}
