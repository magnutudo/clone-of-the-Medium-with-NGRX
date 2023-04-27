import {AppStateInterface} from "../../shared/types/appState.interface";
import {createSelector} from "@ngrx/store";
import {CreateArticleStateInterface} from "./types/createArticleState.interface";

export const createArticleFeatureSelector = (
  state: AppStateInterface
): CreateArticleStateInterface => state.createArticle

export const isSubmittingSelector = createSelector(createArticleFeatureSelector, (createArticleState: CreateArticleStateInterface) => createArticleState.isSubmitting)
export const validationErrorsSelector = createSelector(
  createArticleFeatureSelector,
  (createArticle: CreateArticleStateInterface) => createArticle.validationErrors
)
