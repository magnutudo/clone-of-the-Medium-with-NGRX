import {Injectable} from "@angular/core";
import {RegisterRequestInterface} from "../types/registerRequest.interface";
import {map, Observable} from "rxjs";
import {CurrentUserInterface} from "../../shared/types/currentUser.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {AuhResponseInterface} from "../types/auhResponse.interface";
import {LoginRequestInterface} from "../types/loginRequest.interface";
import {CurrentUserInputInterface} from "../../shared/types/currentUserInput.interface";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  getUser(response: AuhResponseInterface): CurrentUserInterface {
    return response.user
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + "/users"
    return this.http.post<AuhResponseInterface>(url, data).pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + "/users/login"
    return this.http.post<AuhResponseInterface>(url, data).pipe(map(this.getUser))
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + "/user"
    return this.http.get(url).pipe(map(this.getUser))
  }

  updateCurrentUser(currentUserInput: CurrentUserInputInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + "/user"
    return this.http.put(url, {user: currentUserInput}).pipe(map(this.getUser))
  }
}
