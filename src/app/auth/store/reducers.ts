import {AuthStateInterface} from "../types/authState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {registerAction, registerFailureAction, registerSuccessAction} from "./actions/register.action";
import {loginAction, loginFailureAction, loginSuccessAction} from "./actions/login.action";
import {getCurrentUserAction, getCurrentUserSuccessAction} from "./actions/getCurrentsUser.action";

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoading: false,
  isLoggedIn: null,
  validationErrors: null
}
const authReducer = createReducer(
  initialState,
  on(registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })),
  on(registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })),
  on(registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })),
  on(loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),
  on(loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
      isLoggedIn: true
    })
  ),
  on(loginFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
  on(getCurrentUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading:true

    })
  ),
  on(getCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading:false,
      currentUser:action.currentUser,
      isLoggedIn:true
    })
  )
)

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}
