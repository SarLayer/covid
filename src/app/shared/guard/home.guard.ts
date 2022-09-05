import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../providers/auth.service';
import {Observable, of} from 'rxjs';
import {Injectable} from "@angular/core";
import {switchMap} from "rxjs/operators";

@Injectable()
export class HomeGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.auth.getProfile()
      .pipe(
        switchMap(() => {
          if (this.auth.userLoggedIn) {
            return of(true);
          } else {
            this.router.navigate(['/login']);
            return of(false);
          }
        })
      )
  }
}
