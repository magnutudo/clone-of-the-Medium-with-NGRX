import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {CurrentUserInterface} from "../../../../types/currentUser.interface";
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../../../../types/appState.interface";
import {currentUserSelector, isAnonymousSelector, isLoggedInSelector} from "../../../../../auth/store/selectors";

@Component({
  selector: "app-topBar",
  templateUrl: "./topBar.component.html",
  styleUrls: ['./topBar.component.scss']
})
export class TopBarComponent implements OnInit{
  constructor(private store: Store<AppStateInterface>) {
  }
  isLoggedIn$:Observable<boolean>
  isAnonymous$:Observable<boolean>
  currentUser$ : Observable<CurrentUserInterface | null>

  ngOnInit(){
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }
}
