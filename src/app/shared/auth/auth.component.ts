import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {gatekeeperConfig} from '../../gatekeeper.config';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {AuthService} from '../../providers/auth.service';
import {HttpClient} from "@angular/common/http";
import {Token} from "../../model/token.model";
import {AutoUnsubscribe} from "../core/auto-unsubscribe";
import {Subject} from 'rxjs';

@AutoUnsubscribe()
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})

export class AuthComponent implements OnInit, OnDestroy {
  public accessToken: any;
  private code: any;
  private unsubscribeStream$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private http: HttpClient) {
  }


  public getToken(code: string) {
    this.accessToken = this.http.get<Token>(gatekeeperConfig.development.gatekeeper + '/authenticate/' + code).pipe(
      tap((res: Token) => {
        let json = res.token;
        console.log(json);
        if (json) {
          this.accessToken = json;
          localStorage.setItem('access_token', this.accessToken);
        } else {
          localStorage.removeItem('access_token');
        }
      }))

    return this.accessToken;
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        switchMap((param: any) => this.getToken(param['code'])),
        switchMap(() => this.authService.getProfile()),
        tap(() => this.router.navigate(['/home'])),
        takeUntil(this.unsubscribeStream$)
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
  }
}
