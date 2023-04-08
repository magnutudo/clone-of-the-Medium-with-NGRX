import {Injectable} from "@angular/core";
import {RegisterRequestInterface} from "../types/registerRequest.interface";
import {map, Observable} from "rxjs";
import {CurrentUserInterface} from "../../shared/types/currentUser.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {AuhResponseInterface} from "../types/auhResponse.interface";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + "/users"
    return this.http.post<AuhResponseInterface>(url, data).pipe(map((res: AuhResponseInterface) => res.user))
  }
}
