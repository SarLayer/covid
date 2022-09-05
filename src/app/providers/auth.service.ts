import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {User} from '../model/user.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  private _loggedInUser: User | undefined;

  get loggedInUser(): User {
    return this._loggedInUser as User;
  }

  private _userLoggedIn: boolean | undefined;

  get userLoggedIn(): boolean {
    return this._userLoggedIn as boolean;
  }

  public getProfile(): Observable<User> {
    let options = {headers: new HttpHeaders({Authorization: 'token ' + localStorage.getItem("access_token")})}; // Create a request option

    return this.http.get<User>("https://api.github.com/user", options)
      .pipe(
        tap((res: User) => {
          this._loggedInUser = res;
          this._userLoggedIn = true as boolean;
        }),
        catchError(() => {
          this.router.navigate(['/login']);
          return throwError(null);
        })
      )
  }

  public logout() {
    this._userLoggedIn = false;
    localStorage.removeItem('access_token');
    return this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
