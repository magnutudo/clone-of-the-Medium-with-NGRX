import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from "./auth/auth.module";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {TopBarModule} from "./shared/modules/topBar/topBar.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PersistanceService} from "./shared/services/persistance.service";
import {Authinterceptor} from "./shared/services/authinterceptor.service";
import {GlobalFeedModule} from "./global/globalFeed.module";
import {routerReducer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {YourFeedModule} from "./yourFeed/yourFeed.module";
import {TagFeedModule} from "./tagFeed/tagFeed.module";
import {ArticleModule} from "./article/article.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([]),
    AuthModule,
    StoreModule.forRoot({router: routerReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    StoreRouterConnectingModule.forRoot(),
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    ArticleModule
  ],
  providers: [PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Authinterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
