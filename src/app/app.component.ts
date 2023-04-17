import {Component, OnInit} from '@angular/core';

import {AppStateInterface} from "./shared/types/appState.interface";
import {Store} from "@ngrx/store";
import {getCurrentUserAction} from "./auth/store/actions/getCurrentsUser.action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {
  }

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction())
  }


}
