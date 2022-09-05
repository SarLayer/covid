import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../providers/auth.service';
import {User} from '../model/user.model';
import {CovidService} from "../shared/service/covid.service";
import {takeUntil, tap} from "rxjs/operators";
import {AllInformation} from "../model/all-information.model";
import {AutoUnsubscribe} from "../shared/core/auto-unsubscribe";
import {Subject} from "rxjs";

@AutoUnsubscribe()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, OnDestroy {
  public countries: string[];
  private unsubscribeStream$: Subject<void> = new Subject<void>();

  constructor(public authService: AuthService,
              public covidService: CovidService) {
  }

  public ngOnDestroy(): void {
  }

  public logout(): void {
    this.authService.logout();
  }

  public ngOnInit(): void {
    this.authService.getProfile().subscribe((user: User) => console.log(user));
    this.covidService.getLiveCasesData().pipe(
      tap((information: { [country: string]: { [city: string]: AllInformation } }) =>
        this.countries = Object.keys(information)),
      takeUntil(this.unsubscribeStream$)
    ).subscribe()
  }

}
