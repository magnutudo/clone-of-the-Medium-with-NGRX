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
import {LoginEffect} from "./store/effects/login.effect";
import {LoginComponent} from "./components/login/login.component";






const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path:"login",
    component:LoginComponent
  }
]

@NgModule({


  imports: [CommonModule,HttpClientModule, RouterModule.forChild(routes), ReactiveFormsModule, StoreModule.forFeature("auth", reducers), EffectsModule.forFeature([RegisterEffect, LoginEffect]), BackendErrorMessagesModule],

  imports: [CommonModule,HttpClientModule, RouterModule.forChild(routes), ReactiveFormsModule, StoreModule.forFeature("auth", reducers), EffectsModule.forFeature([RegisterEffect]), BackendErrorMessagesModule],

  imports: [CommonModule,HttpClientModule, RouterModule.forChild(routes), ReactiveFormsModule, StoreModule.forFeature("auth", reducers), EffectsModule.forFeature([RegisterEffect])],


  declarations: [
    RegisterComponent,LoginComponent
  ],
  providers:[AuthService,PersistanceService]
})
export class AuthModule {

}
