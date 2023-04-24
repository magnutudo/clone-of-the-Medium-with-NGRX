import {ArticleStateInterface} from "../types/articleState.interface";
import {Action, createReducer, on} from "@ngrx/store";

import {routerNavigationAction} from "@ngrx/router-store";
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from "./actions/getArticle.action";

const initialState: ArticleStateInterface = {
  isLoading: false,
  error: null,
  article: null
}
const articleReducer = createReducer(
  initialState,
  on(getArticleAction, (state): ArticleStateInterface => ({
    ...state,
    isLoading: true
  })),
  on(getArticleSuccessAction, (state, action): ArticleStateInterface => ({
    ...state,
    article: action.article,
    isLoading: false
  })),
  on(getArticleFailureAction, (state): ArticleStateInterface => ({
    ...state,
    isLoading: false,
  })),
  on(routerNavigationAction, (): ArticleStateInterface => initialState)
)

export function reducers(state: ArticleStateInterface, action: Action) {
  return articleReducer(state, action)
}
